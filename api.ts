import { api, endpoint, request, response, body } from "@airtasker/spot";

@api({ name: "Test API" })
class Api {
}

@endpoint({ method: "POST", path: "/login" })
class postlogin {
    @request
    request(body: postloginRequest) {
    }

    @response({ status: 200 })
    response(body: postloginResponse) {
    }
}

interface postloginRequest {
    // TODO: fill
}

interface postloginResponse {
    // TODO: fill
}

@endpoint({ method: "GET", path: "/whoami" })
class getwhoami {
    @request
    request(body: getwhoamiRequest) {
    }

    @response({ status: 200 })
    response(body: getwhoamiResponse) {
    }
}

interface getwhoamiRequest {
    // TODO: fill
}

interface getwhoamiResponse {
    // TODO: fill
}
