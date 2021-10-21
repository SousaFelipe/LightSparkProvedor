const Response = require('../../../core/Response')

const lang = require('../../../config/lang').ptBR

const ProvedorRepository = require('../../repository/ProvedorRepository')
const UserRepository = require('../../repository/UserRepository')



class LoginController {


    async login (request, response) {
        const { email, password } = request.body

        if (await UserRepository.hasEmail(email)) {

            if (await UserRepository.hasPassword(email, password)) {
                const session = await UserRepository.attempt(email, password)

                return new Response(response)
                    .ok()
                    .json({ auth: true, token: session })
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
