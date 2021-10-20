const ProvedorRepository = require('../repository/ProvedorRepository')



class Auth {


    async subscription (request, response, next) {
        const { authorization } = request.headers

        try {
            if (await ProvedorRepository.activeSubscription(authorization)) {
                return next()
            }

            return response.status(403).json({})
        }
        catch (error) {
            return response.status(500).json({
                error,
                msg: 'Erro ao checar o status da assinatura'
            })
        }
    }
}



module.exports = new Auth()
