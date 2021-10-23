const Response = require('../../../../core/Response')

const Auth = require('../../../middlewares/Auth')



class AppController {


    async auth (request, response) {
        
        const auth = await Auth(request)
        const resp = new Response(response)

        return auth.authorization
            ? resp.ok().json(auth)
            : resp.forbidden().json(auth)
    }
}



module.exports = new AppController()
