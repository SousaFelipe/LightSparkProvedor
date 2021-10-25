const lang = require('../../../../config/lang').ptBR

const Response = require('../../../../core/Response')

const UserRepository = require('../../../repository/UserRepository')



class LoginController {


    async auth (request, response) {
        const unlogged = new Response(response).registered(request)
        
        const { email, password } = request.body
        const user = await UserRepository.hasEmail(email, true)

        if (user) {
            if (await UserRepository.hasPassword(email, password)) {
                const token = await UserRepository.attempt(email, password)

                if (token) {
                    response.cookie('session', token)
                    return response.redirect('dashboard')
                }
                else {
                    return unlogged.json({ errors: { session: lang.session } })
                }
            }

            return unlogged.json({ errors: { password: lang.password } })
        }

        return unlogged.json({ errors: { email: lang.email } })
    }
}



module.exports = new LoginController()
