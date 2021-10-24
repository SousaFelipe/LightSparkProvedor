const lang = require('../../../../config/lang').ptBR

const Response = require('../../../../core/Response')

const UserRepository = require('../../../repository/UserRepository')



class LoginController {


    async auth (request, response) {
        const resp = new Response(response)

        const { email, password } = request.body

        if (await UserRepository.hasEmail(email)) {
            const user = await UserRepository.hasPassword(email, password)

            if (user) {
                const session = await UserRepository.attempt(email, password)

                return session
                    ? resp.view('dashboard', { session, user })
                    : resp.json({ errors: { session: lang.session } })
            }

            return resp.json({ errors: { password: lang.password } })
        }

        return resp.json({ errors: { email: lang.email } })
    }
}



module.exports = new LoginController()
