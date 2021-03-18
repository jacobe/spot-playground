const restify = require('restify')
const uuid = require('uuid')

const server = restify.createServer({
  name: 'Test API',
  version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

const sessions = {}

server.post('/login', function (req, res, next) {
  console.log(`Logging in with ${req.body.username}`)
  if (req.body.password !== '123') {
    res.send(401)
    return next()
  }

  const sessionId = uuid.v4()
  sessions[sessionId] = {
    username: req.body.username
  }

  res.send(200, {
    sessionId: sessionId
  })
  return next()
})

server.get('/whoami', function (req, res, next) {
  console.log('Whoami')
  const sessionId = req.header('Authorization')
  if (!sessionId || !sessions[sessionId]) {
    res.send(400)
    return next()
  }

  const session = sessions[sessionId]
  res.send(200, {
    username: session.username
  })
})

module.exports = server
