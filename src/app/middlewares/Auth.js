const UserRepository = require('../repository/UserRepository')

const Response = require('../../core/Response')



module.exports = async function Auth(request, response, next) {
    const { session } = request.body

    try {
        
    }
    catch (error) {
        return new Response(response)
            .internalServerError('Erro ao checar o status da assinatura')
            .json({ error })
    }
}
