const Cookie = require('../../core/Cookie')

const ProvedorRepository = require('../repository/ProvedorRepository')
const UserRepository = require('../repository/UserRepository')



const Authorization = (async (provedor) => {
    return {
        access: {
            authorized: (provedor != false)
        },
        user: await UserRepository.exists({ provedor: provedor.id }, true)
    }
})



module.exports = (async function (request) {
    const { authorization } = request.body

    if (authorization) {
        const provedor = await ProvedorRepository.requestAuthByToken(authorization)
        return await Authorization(provedor)
    }
    else {

        const cookie = new Cookie(request.cookies)
        const session = cookie.get('session')

        if (session) {
            const provedor = await ProvedorRepository.requestAuthBySession(session)
            return await Authorization(provedor)
        }
    }

    return await Authorization(false)
})
