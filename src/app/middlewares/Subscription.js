const ProvedorRepository = require('../repository/ProvedorRepository')
const SessionRepository = require('../repository/SessionRepository')

const Response = require('../../core/Response')



module.exports = async function Subscription(request, response, next) {
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
