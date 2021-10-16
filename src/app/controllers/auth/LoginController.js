const ProvedorRepository = require('../../repository/ProvedorRepository')
const UserRepository = require('../../repository/UserRepository')

const lang = require('../../../config/lang').ptBR



class LoginController {


    async login (request, response) {

        const { authorization } = await request.headers
        const { email, password } = await request.body

        if (await ProvedorRepository.authorization(authorization)) {
            if (await UserRepository.hasEmail(email)) {
                if (await UserRepository.hasPassword(email, password)) {
                    const session = await UserRepository.attempt(email, password)

                    return response.status(200).json({
                        error: false,
                        msg: session
                    })
                }

                return response.status(403).json({
                    error: true,
                    msg: lang.password
                })
            }

            return response.status(403).json({
                error: true,
                msg: lang.email
            })
        }

        return response.status(403).json({
            error: true,
            msg: lang.auth
        })
    }


    unauth (request, response) {
        return response.status(200).json({})
    }
}



module.exports = new LoginController()
