const Response = require('../../../core/Response')
const Security = require('../../../core/Security')

const lang = require('../../../config/lang').ptBR

const UserRepository = require('../../repository/UserRepository')



class LoginController {


    async login (request, response) {
        const { email, password } = request.body

        if (await UserRepository.hasEmail(email)) {
            const decrypted = Security.decrypted(password)

            if (await UserRepository.hasPassword(email, decrypted)) {
                const session = await UserRepository.attempt(email, decrypted)

                if (session) {
                    return new Response(response).json({ auth: true, session })
                }

                return new Response(response)
                    .internalServerError('Erro ao realizar login')
                    .json({ auth: false })
            }

            return new Response(response)
                .forbidden(lang.password)
                .json({ auth: false })
        }

        return new Response(response)
            .forbidden(lang.email)
            .json({ auth: false })
    }


    logout (request, response) {
        return response.status(200).json({})
    }
}



module.exports = new LoginController()
