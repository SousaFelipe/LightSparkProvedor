const Response = require('../../core/Response')

const ProvedorRepository = require('../repository/ProvedorRepository')
const SessionRepository = require('../repository/SessionRepository')



class AppController {


    home (request, response) {
        return response.render('home')
    }


    async subscriptionCheck (request, response) {
        const { authorization } = request.headers

        try {
            return new Response(response)
                .ok()
                .json(await ProvedorRepository.activeSubscription(authorization))
        }
        catch (error) {
            return new Response(response)
                .internalServerError(lang.subscription)
                .json()
        }
    }


    async sessionCheck (request, response) {
        const { session } = request.body
        const activeToken = await SessionRepository.isActive(session)

        return new Response(response)
            .ok()
            .json({
                session: activeToken
            })
    }
}



module.exports = new AppController()
