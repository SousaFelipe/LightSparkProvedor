const DB = require('../../database/DB')
const SessionRepository = require('../repository/SessionRepository')
const User = require('../models/User')

const Security = require('../../core/Security')



class UserRepository {


    constructor () {
        User.init(DB.connection())
    }


    async exists (userId, retrieve = false) {
        const user = await User.findOne({ where: { id: userId } })

        return (user !== null)
            ? retrieve ? user : true
            : false
    }


    async hasEmail (email) {
        const user = await User.findOne({ where: { email } })
        return (user !== null)
    }


    async hasPassword (email, password) {
        const decrypted = Security.decrypted(password)
        const user = await User.findOne({ where: { email, password: decrypted } })
        return (user !== null)
    }


    async attempt (email, password) {
        const decrypted = Security.decrypted(password)
        const user = await User.findOne({ where: { email, password: decrypted } })

        if (user != null) {
            return await SessionRepository.registerOrRetrieve(user.id)
        }
        
        return false
    }
}



module.exports = new UserRepository()
