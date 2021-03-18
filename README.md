# spot-playground
Experimenting with [Spot](https://github.com/airtasker/spot) and OpenAPI client generators

## Getting Started
The workflow is as follows:

1. Implement a new endpoint in `./server.js`
2. Run `npm run gen:spot-contract` to generate/update a [Spot](https://github.com/airtasker/spot) contract containing endpoints and request/response definitions (stored in `./api.ts`).
3. Run `npm run gen:openapi` to generate an OpenAPI schema (`api.yml`) from the Spot contract.
4. Run `npm run gen:client` to generate a TypeScript client library stored in `./client/`
