const ProvedorRepository = require('../repository/ProvedorRepository')



module.exports = async function Auth(request) {

    let auth = {
        authorization: false,
        token: 'empty'
    }

    const { server } = request.body
    
    if (server) {
        const provedor = await ProvedorRepository.getServerAuth(server)
        
        auth.authorization = (provedor != false)
        auth.token = auth.authorization ? provedor.token : auth.token

        return { acesso: auth }
    }
    else {
        const { authorization } = request.headers

        if (authorization) {
            const provedor = await ProvedorRepository.getTokenAuth(authorization)

            auth.authorization = (provedor != false)
            auth.token = auth.authorization ? provedor.token : auth.token
        }
    }

    return { acesso: auth }
}
