import { api, endpoint, request, response, body } from "@airtasker/spot"

@api({ name: "Test API" })
class Api {}

@endpoint({ method: "POST", path: "/users" })
class CreateUser {
  @request
  request(@body body: CreateUserRequest) { }

  @response({ status: 201 })
  response(@body body: CreateuserResponse) { }
}

interface CreateUserRequest {
  firstName: string
  lastName: string
}

interface CreateuserResponse {
  firstName: string
  lastName: string
  role: string
}