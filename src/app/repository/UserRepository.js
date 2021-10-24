const bcrypt = require('bcrypt')

const DB = require('../../database/DB')
const SessionRepository = require('../repository/SessionRepository')
const User = require('../models/User')

const Security = require('../../core/Security')



class UserRepository {


    constructor () {
        User.init(DB.connection())

        this.attributes = [
            'id', 'name', 'email'
        ]
    }


    async exists (userId, retrieve = false) {
        const user = await User.findOne({ where: { id: userId } })

        return (user !== null)
            ? retrieve ? user : true
            : false
    }


    async hasEmail (email, retrieve = false) {
        
        const user = await User.findOne({
            where: { email },
            attributes: this.attributes
        })

        return (user !== null)
            ? retrieve ? user : true
            : false
    }


    async hasPassword (email, password, retrieve = false) {
        
        const decrypted = Security.decrypted(password)
        const user = await User.findOne({ where: { email } })

        if (user != null) {
            const match = await bcrypt.compare(decrypted, user.password)

            return match
                ? retrieve ? user : true
                : false
        }

        return false
    }


    async attempt (email, password) {
        const decrypted = Security.decrypted(password)

        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'password']
        })

        if (user != null) {
            const match = await bcrypt.compare(decrypted, user.password)

            if (match) {
                return await SessionRepository.registerOrRetrieve(user.id)
            }
        }
        
        return false
    }
}



module.exports = new UserRepository()
