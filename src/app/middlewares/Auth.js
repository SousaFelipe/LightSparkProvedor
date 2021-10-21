const ProvedorRepository = require('../repository/ProvedorRepository')
const SessionRepository = require('../repository/SessionRepository')

const Response = require('../../core/Response')



class Auth {
    

    async subscription (request, response, next) {

        const { authorization } = request.headers
        const { server } = request.body

        try {
            const auth = await ProvedorRepository.authorization(authorization)
            const subscription = await ProvedorRepository.activeSubscription(server)
            
            return (auth || subscription.subscription)
                ? next()
                : new Response(response).forbidden().json(subscription)
        }
        catch (error) {
            return new Response(response)
                .internalServerError('Erro ao checar o status da assinatura')
                .json({ error })
        }
    }


    async session (request, response, next) {
        const { session } = request.body

        try {
            const activeSession = await SessionRepository.isActive(session)

            return activeSession
                ? next()
                : new Response(response).forbidden().json({ activeSession })
        }
        catch (error) {
            return new Response(response)
                .internalServerError('Erro ao checar o status da sessão')
                .json({ error })
        }
    }
}



module.exports = new Auth()
