const bcrypt = require('bcrypt')

const Response = require('../../../core/Response')
const Security = require('../../../core/Security')

const Auth = require('../../middlewares/Auth')
const UserRepository = require('../../repository/UserRepository')



class AppController {


    async auth (request, response) {
        
        const auth = await Auth(request)
        const resp = new Response(response)

        return auth.authorization
            ? resp.ok().json(auth)
            : resp.forbidden().json(auth)
    }



    async encrypt (request, response) {
        const { plain } = request.body
        const encrypted = Security.encrypted(plain)
        return new Response(response).json({ encrypted })
    }


    async decrypt (request, response) {
        const { encrypted } = request.body
        const decrypted = Security.decrypted(encrypted)
        return new Response(response).json({ decrypted })
    }


    async hash (request, response) {
        const { plain } = request.body
        const hashad = bcrypt.hashSync(plain, bcrypt.genSaltSync(Security.instance().bcrypt.ROUNDS))
        return new Response(response).json({ hashad })
    }


    async compare (request, response) {
        const { encrypted } = request.body
        const password = Security.decrypted(encrypted)

        const user = await UserRepository.exists(1, true)
        const match = await bcrypt.compare(password, user.password)

        return new Response(response).json({
            match: match ? user.password : 'empty',
        })
    }
}



module.exports = new AppController()
