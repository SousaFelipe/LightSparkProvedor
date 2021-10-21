const SessionRepository = require('../repository/SessionRepository')

const Response = require('../../core/Response')



module.exports = async function Session(request, response, next) {
    const { session } = request.body

    try {
        const activeSession = await SessionRepository.isActive(session)

        return activeSession
            ? next()
            : new Response(response).forbidden().json({ session: activeSession })
    }
    catch (error) {
        return new Response(response)
            .internalServerError('Erro ao checar o status da sessão')
            .json({ error })
    }
}
