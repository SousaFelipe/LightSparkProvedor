const User = require('../../models/User')



class RegisterController {

    
    async store (request, response) {
        const { name, email, password } = request.body
        
        await User.create({ name, email, password }, err => {

            if (err) {
                return response.status(400).json({
                    error: true,
                    message:'Erro ao inserir um novo usuário no banco de dados'
                })
            }

            return response.status(200).json({
                error: false,
                message: 'Usuário cadastrado com sucesso'
            })
        })
    }


    remove (request, response) {

    }
}



module.exports = new RegisterController()
