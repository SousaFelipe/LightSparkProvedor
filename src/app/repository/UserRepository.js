const DB = require('../../database/DB')
const SessionRepository = require('../repository/SessionRepository')
const User = require('../models/User')



class UserRepository {


    constructor () {
        User.init(DB.connection())
    }


    async hasEmail (email) {
        const user = await User.findOne({ where: { email } })
        return (user !== null)
    }


    async hasPassword (email, password) {
        const user = await User.findOne({ where: { email, password } })
        return (user !== null)
    }


    async attempt (email, password) {
        const user = await User.findOne({ where: { email, password } })

        if (user != null) {
            const currentSession = await SessionRepository.getIfUnexpired(user.id)

            if (currentSession) {
                return currentSession
            }

            const newSession = await SessionRepository.register(user.id)

            return (newSession)
                ? newSession
                : false
        }
        
        return false
    }
}



module.exports = new UserRepository()
