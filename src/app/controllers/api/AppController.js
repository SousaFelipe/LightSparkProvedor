const bcrypt = require('bcrypt')

const Response = require('../../../core/Response')
const Security = require('../../../core/Security')

const Auth = require('../../middlewares/Authorization')
const UserRepository = require('../../repository/UserRepository')



class AppController {


    async auth (request, response) {
        
        const auth = await Auth(request)
        const resp = new Response(request, response)

        return auth.authorization
            ? resp.ok().json(auth)
            : resp.forbidden().json(auth)
    }


    async encrypt (request, response) {
        const { plain } = request.body
        const encrypted = Security.cbcEncrypted(plain)
        return new Response(request, response).json({ encrypted })
    }


    async decrypt (request, response) {
        const { encrypted } = request.body
        const decrypted = Security.cbcDecrypted(encrypted)
        return new Response(request, response).json({ decrypted })
    }


    async hash (request, response) {
        const { plain } = request.body
        const hashad = bcrypt.hashSync(plain, bcrypt.genSaltSync(Security.instance().bcrypt.ROUNDS))
        return new Response(request, response).json({ hashad })
    }


    async compare (request, response) {
        const { encrypted } = request.body
        const password = Security.decrypted(encrypted)

        const user = await UserRepository.exists(1, true)
        const match = await bcrypt.compare(password, user.password)

        return new Response(request, response).json({
            match: match ? user.password : 'empty',
        })
    }
}



module.exports = new AppController()
