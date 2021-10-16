const UserRepository = require('../repository/UserRepository')



class UserController {


    auth (request, response) {
        const body = request.body
        
        const data = {
            email: body.email,
            password: body.password
        }
        
        if (UserRepository.isset(data)) {
            return response.status(200).json({
                error: false,
                msg: 'User already exists!',
                auth: null
            })
        }

        return response.status(200).json({
            error: false,
            msg: 'User already exists!',
            auth: request.body
        })
    }
}



module.exports = new UserController()
