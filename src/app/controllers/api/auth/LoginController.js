const Response = require('../../../../core/Response')

const lang = require('../../../../config/lang').ptBR

const SessionRepository = require('../../../repository/SessionRepository')
const UserRepository = require('../../../repository/UserRepository')



class LoginController {


    async login (request, response) {
        let http = new Response(request, response).registered()

        const { email, password } = request.body
        const user = await UserRepository.hasEmail(email, true)

        if (user) {
            if (await UserRepository.hasPassword(email, password)) {
                const token = await UserRepository.attempt(email, password)

                if (token) {
                    response.cookie('session', token)
                    return await (new Response(request, response).registered().json({ logged: true, token }))
                }
            }

            http = http.forbidden(lang.password)
        }

        return await http.json({ logged: false })
    }


    async logout (request, response) {
        let http = new Response(request, response).authorized()
        
        const { session } = request.body

        if (session) {
            const loggedout = await SessionRepository.destroy(session)
            request.session.destroy(error => console.error(error))
            return await (new Response(request, response).registered().authorized().json(loggedout))
        }

        return await http.forbidden().json({})
    }
}



module.exports = new LoginController()
