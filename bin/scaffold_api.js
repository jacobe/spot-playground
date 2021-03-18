#!/usr/bin/env node
'use strict'
const ts = require('typescript')
const { Project } = require('ts-morph')
/**
 * @typedef {import('restify').Route} Route
 * @typedef {import('restify').Server} Server
 * @typedef {import('ts-morph').SourceFile} SourceFile
 */

async function main () {
  const args = process.argv
  if (!args[2]) {
    console.error('Please provide a require path to the server')
    process.exit(1)
  }
  const server = require(args[2])

  const project = new Project({
    useInMemoryFileSystem: false // set to `true`
  })

  let apiFile = project.addSourceFileAtPathIfExists('api.ts')
  if (!apiFile) {
    apiFile = project.createSourceFile('api.ts')
    apiFile.addImportDeclaration({
      moduleSpecifier: '@airtasker/spot',
      namedImports: 'api, endpoint, request, response, body'
    })
  }

  writeApiScaffold(apiFile, server)
  await apiFile.save()

  // Spot.parseContract('')
  // spot.Spot.OpenApi3.generateOpenAPI3()
}
main()

/**
 *
 * @param {SourceFile} apiFile
 * @param {Server} server
 */
function writeApiScaffold (apiFile, server) {
  declareApi(apiFile, server)

  const routes = server.router.getRoutes()
  for (const id in routes) {
    const route = routes[id]
    declareEndpoint(apiFile, route)
  }
}

/**
 * Generates a Spot API declaration similar to:
 * ```
 * @api({ name: "Test API" })
 * class Api {}
 * ```
 *
 * @param {SourceFile} sourceFile
 * @param {Server} server
 */
function declareApi (sourceFile, server) {
  const apiClass = sourceFile.getClass('Api')
  if (!apiClass) {
    const apiClass = sourceFile.insertClass(1, { name: 'Api' })
    apiClass.addDecorator({ name: 'api' }).addArgument(`{ name: "${server.name}" }`)
  }
}

/**
 * Generates a Spot endpoint declaration similar to:
 * ```
 * @endpoint({ method: "POST", path: "/users" })
 * class CreateUser {
 *  @request
 *  request(@body body: CreateUserRequest) { }
 *
 *  @response({ status: 201 })
 *  response(@body body: CreateuserResponse) { }
 * }
 *
 * interface postloginRequest {
 * }
 *
 * interface postloginResponse {
 * }
 * ```
 *
 * @param {SourceFile} sourceFile
 * @param {Route} route
 */
function declareEndpoint (sourceFile, route) {
  if (!sourceFile.getClass(route.name)) {
    sourceFile.addClass({
      name: route.name,
      decorators: [{
        name: 'endpoint',
        arguments: [`{ method: "${route.method}", path: "${route.path}" }`]
      }],
      methods: [
        {
          name: 'request',
          decorators: [{ name: 'request' }],
          parameters: [{ name: 'body', decorators: [{ name: 'body' }], type: route.name + 'Request' }]
        },
        {
          name: 'response',
          decorators: [{ name: 'response', arguments: ['{ status: 200 }'] }],
          parameters: [{ name: 'body', decorators: [{ name: 'body' }], type: route.name + 'Response' }]
        }
      ]
    })

    const reqInterface = sourceFile.addInterface({
      name: route.name + 'Request'
    })
    sourceFile.insertText(reqInterface.getLastToken().getPos(), '\n    // TODO: fill')

    const resInterface = sourceFile.addInterface({
      name: route.name + 'Response'
    })
    sourceFile.insertText(resInterface.getLastToken().getPos(), '\n    // TODO: fill')
  }
}

/**
 * Generates an API declaration similar to:
 * ```
 * @api({ name: "Test API" })
 * class Api {}
 * ```
 * @param {Server} server
 */
function declareApiTs (server) {
  const apiDecorator = ts.factory.createDecorator(
    ts.factory.createCallExpression(
      ts.factory.createIdentifier('api'),
      undefined,
      [
        ts.factory.createObjectLiteralExpression([
          ts.factory.createPropertyAssignment('name', ts.factory.createStringLiteral(server.name))
        ])
      ]
    )
  )
  const classDeclaration = ts.factory.createClassDeclaration([apiDecorator],
    undefined,
    'Api')
  return classDeclaration
}

/**
 * Generates a class declaration similar to:
 * ```
 * @endpoint({ method: "POST", path: "/users" })
 * class CreateUser {
 *  @request
 *  request(@body body: CreateUserRequest) { }
 *
 *  @response({ status: 201 })
 *  response(@body body: CreateuserResponse) { }
 * }
 * ```
 * @param {Route} route
 */
function declareEndpointTs (route) {
  const endpointDecorator = ts.factory.createDecorator(
    ts.factory.createCallExpression(
      ts.factory.createIdentifier('endpoint'),
      undefined,
      [
        ts.factory.createObjectLiteralExpression([
          ts.factory.createPropertyAssignment('method', ts.factory.createStringLiteral(route.method)),
          ts.factory.createPropertyAssignment('path', ts.factory.createStringLiteral(route.path))
        ])
      ]
    )
  )
  const classMembers = [
    ts.factory.createFunctionDeclaration(
      [ts.factory.createDecorator(
        ts.factory.createIdentifier('request')
      )],
      undefined,
      undefined,
      'request',
      undefined,
      [ts.factory.createParameterDeclaration(
        [ts.factory.createDecorator(
          ts.factory.createIdentifier('body')
        )],
        undefined,
        undefined,
        'body',
        undefined,
        ts.factory.createIdentifier(route.name + 'Request')
      )]
    ),
    ts.factory.createFunctionDeclaration(
      [ts.factory.createDecorator(
        ts.factory.createIdentifier('response')
      )],
      undefined,
      undefined,
      'response',
      undefined,
      [ts.factory.createParameterDeclaration(
        [ts.factory.createDecorator(
          ts.factory.createIdentifier('body')
        )],
        undefined,
        undefined,
        'body',
        undefined,
        ts.factory.createIdentifier(route.name + 'Response')
      )]
    )
  ]
  const classDeclaration = ts.factory.createClassDeclaration([endpointDecorator],
    undefined,
    route.name,
    undefined,
    undefined,
    classMembers)
  return classDeclaration
}
