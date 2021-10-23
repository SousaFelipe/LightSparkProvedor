const ProvedorRepository = require('../repository/ProvedorRepository')



const description = function (status) {

    const descriptions = {
        'P': () => 'pre',
        'A': () => 'ativo',
        'B': () => 'bloqueado',
        'C': () => 'cancelado',
        'U': () => 'unknow'
    }

    return (descriptions[status] || descriptions['U'])()
} 



module.exports = async function Subscription(request) {
    const { server } = request.body
    const { authorization } = request.headers
    
    let auth = {
        subscription: false,
        status: false,
        description: 'unknow'
    }
    
    if (authorization || server) {

        const provedor = authorization
            ? await ProvedorRepository.getTokenAuth(authorization)
            : await ProvedorRepository.getServerAuth(server)

        const isAuth = (provedor != false)

        auth.subscription = isAuth ? (provedor.status === 'A') : false
        auth.status = isAuth ? provedor.status : false
        auth.description = isAuth ? description(auth.status) : auth.description
    }

    return { registro: auth }
}
