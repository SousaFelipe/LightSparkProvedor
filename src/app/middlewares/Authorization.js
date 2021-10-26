const Cookie = require('../../core/Cookie')

const ProvedorRepository = require('../repository/ProvedorRepository')



const Authorization = ((provedor) => {
    return { access: {
        authorized: (provedor != false)
    }}
})



module.exports = (async function (request) {
    const { authorization } = request.body

    if (authorization) {
        const provedor = await ProvedorRepository.requestAuthByToken(authorization)
        return Authorization(provedor)
    }
    else {

        const cookie = new Cookie(request.cookies)
        const session = cookie.get('session')

        if (session) {
            const provedor = await ProvedorRepository.requestAuthBySession(session)
            return Authorization(provedor)
        }
    }

    return Authorization(false)
})
