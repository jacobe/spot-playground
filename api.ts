import { api, endpoint, request, response, body } from "@airtasker/spot";

@api({ name: "Test API" })
class Api {
}

@endpoint({ method: "POST", path: "/login" })
class login {
    @request
    request(@body body: loginRequest) {
    }

    @response({ status: 200 })
    response(@body body: loginResponse) {
    }
}

interface loginRequest {
    username: string
    password: string
}

interface loginResponse {
    sessionId: string
}

@endpoint({ method: "GET", path: "/whoami" })
class whoami {
    @request
    request(@body body: whoamiRequest) {
    }

    @response({ status: 200 })
    response(@body body: whoamiResponse) {
    }
}

interface whoamiRequest {
    // TODO: fill
}

interface whoamiResponse {
    username: string
}
