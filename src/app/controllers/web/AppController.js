const Response = require("../../../core/Response")



class AppController {


    async login (request, response) {
        
        return new Response(response)
            .view('auth/login')
    }
}



module.exports = new AppController()
