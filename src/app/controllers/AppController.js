const ProvedorRepository = require('../repository/ProvedorRepository')



class AppController {


    home (request, response) {
        return response.render('home')
    }


    async hasActiveSubscription (request, response) {
        const { server } = request.body

        try {
            return response.status(200).json(
                await ProvedorRepository.activeSubscription(server)
            )
        }
        catch (error) {
            return response.status(500).json({
                error,
                msg: 'Erro ao checar o status da assinatura'
            })
        }
    }


    async hasActiveSession (request, response) {

    }
}



module.exports = new AppController()
