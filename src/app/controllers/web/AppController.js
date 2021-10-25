const Response = require("../../../core/Response")



class AppController {


    async login (request, response) {
        return new Response(response)
            .registered(request)
            .view('auth/login', { title: 'Login' })
    }


    async dashboard (request, response) {
        return new Response(response)
            .authorized(request)
            .view('dashboard', { title: 'Dashboard' })
    }


    async bloqueado (request, response) {
        return new Response(response)
            .view('errors/subscription/bloqueado')
    }


    async cancelado (request, response) {
        return new Response(response)
            .view('errors/subscription/cancelado')
    }


    async pre (request, response) {
        return new Response(response)
            .view('errors/subscription/pre')
    }


    async unknow (request, response) {
        return new Response(response)
            .view('errors/subscription/unknow')
    }
}



module.exports = new AppController()
