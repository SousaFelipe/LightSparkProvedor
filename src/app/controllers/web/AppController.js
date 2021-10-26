const Response = require("../../../core/Response")

const RedirectIfAuthenticated = require("../../middlewares/RedirectIfAuthenticated")



class AppController {


    async login (request, response) {
        await RedirectIfAuthenticated(request, response)

        return await (
            new Response(request, response).registered().view('auth/login')
        )
    }


    async dashboard (request, response) {
        return await (
            new Response(request, response).authorized().view('dashboard')
        )
    }


    async provedores (request, response) {
        return await (
            new Response(request, response).authorized().view('provedores')
        )
    }


    async bloqueado (request, response) {
        return await (
            new Response(request, response).view('errors/subscription/bloqueado')
        )
    }


    async cancelado (request, response) {
        return await (
            new Response(request, response).view('errors/subscription/cancelado')
        )
    }


    async pre (request, response) {
        return await (
            new Response(request, response).view('errors/subscription/pre')
        )
    }


    async unknow (request, response) {
        return await (
            new Response(request, response).view('errors/subscription/unknow')
        )
    }
}



module.exports = new AppController()
