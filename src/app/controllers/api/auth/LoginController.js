const Response = require('../../../../core/Response')

const lang = require('../../../../config/lang').ptBR

const SessionRepository = require('../../../repository/SessionRepository')
const UserRepository = require('../../../repository/UserRepository')



class LoginController {


    async login (request, response) {
        const unlogged = new Response(response).registered(request)

        const { email, password } = request.body
        const user = await UserRepository.hasEmail(email, true)

        if (user) {
            if (await UserRepository.hasPassword(email, password)) {
                const token = await UserRepository.attempt(email, password)

                if (token) {
                    response.cookie('session', token)
                    return new Response(response)
                        .registered(request).json({ logged: true, token })
                }
                else {
                    return unlogged.forbidden(lang.session).json({ logged: false })
                }
            }

            return unlogged.forbidden(lang.password).json({ logged: false })
        }

        return unlogged.forbidden(lang.email).json({ logged: false })
    }


    async logout (request, response) {
        const resp = new Response(response).registered(request).authorized()

        const { session } = request.body

        if (session) {
            const loggedout = await SessionRepository.logout(session)
            request.session.destroy(error => console.error(error))
            return resp.json(loggedout)
        }

        return resp.forbidden().json()
    }
}



module.exports = new LoginController()
