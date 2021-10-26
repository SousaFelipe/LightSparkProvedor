const bcrypt = require('bcrypt')

const DB = require('../../database/DB')
const SessionRepository = require('../repository/SessionRepository')
const User = require('../models/User')

const Security = require('../../core/Security')



class UserRepository {


    constructor () {
        User.init(DB.connection())

        this.attributes = [
            'id', 'provedor', 'name', 'email'
        ]
    }


    async exists (userId, retrieve = false) {

        const user = await User.findOne({
            where: { id: userId },
            attributes: this.attributes
        })

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


    async hasPassword (email, password) {

        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'password']
        })

        if (user != null) {
            const match = await bcrypt.compare(password, user.password)
            return match ? true : false
        }

        return false
    }


    async attempt (email, password) {

        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'provedor', 'password']
        })

        if (user != null) {
            const match = await bcrypt.compare(password, user.password)

            if (match) {
                return await SessionRepository.registerOrRetrieve(user)
            }
        }
        
        return false
    }
}



module.exports = new UserRepository()
