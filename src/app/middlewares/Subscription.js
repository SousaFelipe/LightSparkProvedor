const ProvedorRepository = require('../repository/ProvedorRepository')



const Subscription = ((provedor) => {
    const status = provedor ? provedor.status : 'U'

    const descriptions = {
        'P': () => 'pre',
        'A': () => 'ativo',
        'B': () => 'bloqueado',
        'C': () => 'cancelado',
        'U': () => 'unknow'
    }

    return { subscription: {
        subscribed: (provedor != false && provedor.status === 'A'),
        status: status,
        description: (descriptions[status] || descriptions['U'])()
    }}
})



module.exports = (async function () {
    const provedor = await ProvedorRepository.requestSignature()
    return Subscription(provedor)
})
