const Cookie = require('../../core/Cookie')

const ProvedorRepository = require('../repository/ProvedorRepository')



const Authorization = ((provedor) => {
    return { access: {
        authorized: (provedor != false)
    }}
})



module.exports = (async function (request) {
    const { authorization } = request.headers
    
    const cookie = new Cookie(request.cookies)
    const token = authorization ? authorization : cookie.decoded('session')

    const provedor = await ProvedorRepository.requestAuthorization(token)
    return Authorization(provedor)
})
