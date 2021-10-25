const Cookie = require('../../core/Cookie')

const ProvedorRepository = require('../repository/ProvedorRepository')



const Authorization = ((provedor) => {
    return { access: {
        authorized: (provedor != false)
    }}
})



module.exports = (async function (request) {

    const cookie = new Cookie(request.cookies)
    const token = cookie.get('session')

    const provedor = await ProvedorRepository.requestAuthorization(token)
    return Authorization(provedor)
})
