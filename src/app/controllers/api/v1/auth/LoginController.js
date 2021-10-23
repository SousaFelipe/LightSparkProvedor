const Response = require('../../../../../core/Response')

const lang = require('../../../../../config/lang').ptBR

const SessionRepository = require('../../../../repository/SessionRepository')
const UserRepository = require('../../../../repository/UserRepository')



class LoginController {


    async login (request, response) {
        const resp = new Response(response).registered(request)

        const { email, password } = request.body

        if (await UserRepository.hasEmail(email)) {
            if (await UserRepository.hasPassword(email, password)) {
                
                const session = await UserRepository.attempt(email, password)

                return session
                    ? resp.json({ logged: true, session })
                    : resp.forbidden(lang.session).json({ logged: false })
            }

            return resp.forbidden(lang.password).json({ logged: false })
        }

        return resp.forbidden(lang.email).json({ logged: false })
    }


    async logout (request, response) {
        const resp = new Response(response).registered(request).auth()

        const { session } = request.body

        if (session) {
            const loggedout = await SessionRepository.logout(session)
            return resp.json(loggedout)
        }

        return resp.forbidden().json()
    }
}



module.exports = new LoginController()
