const Cookie = require('../../core/Cookie')

const ProvedorRepository = require('../repository/ProvedorRepository')



const Authorization = ((provedor) => {
    return { access: {
        authorized: (provedor != false)
    }}
})



module.exports = (async function (request) {
    const { authorization } = request.body

    const cookie = new Cookie(request.cookies)
    const session = cookie.get('session')

    const provedor = authorization
        ? await ProvedorRepository.requestAuthByToken(authorization)
        : await ProvedorRepository.requestAuthBySession(session)

    return Authorization(provedor)
})
