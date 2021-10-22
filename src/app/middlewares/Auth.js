const UserRepository = require('../repository/UserRepository')
const SessionRepository = require('../repository/SessionRepository')

const Response = require('../../core/Response')



module.exports = async function Auth(request, response, next) {
    const { session } = request.body

    try {
        const activeSession = await SessionRepository.retrieve(session)

        if (activeSession) {
            const user = await UserRepository.exists(activeSession.user)
            if (user) return next()
        }

        return new Response(response)
            .forbidden()
            .json({ auth: false })
    }
    catch (error) {
        return new Response(response)
            .internalServerError('Erro ao checar o status da assinatura')
            .json({ auth: false, error })
    }
}
