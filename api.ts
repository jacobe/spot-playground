import { api, endpoint, request, response, body } from "@airtasker/spot";

@api({ name: "Test API" })
class Api {
}

@endpoint({ method: "POST", path: "/login" })
class login {
    @request
    request(body: loginRequest) {
    }

    @response({ status: 200 })
    response(body: loginResponse) {
    }
}

interface loginRequest {
    // TODO: fill
}

interface loginResponse {
    // TODO: fill
}

@endpoint({ method: "GET", path: "/whoami" })
class whoami {
    @request
    request(body: whoamiRequest) {
    }

    @response({ status: 200 })
    response(body: whoamiResponse) {
    }
}

interface whoamiRequest {
    // TODO: fill
}

interface whoamiResponse {
    // TODO: fill
}
