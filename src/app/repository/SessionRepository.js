const DB = require('../../database/DB')
const Session = require('../models/Session')
const Security = require('../../core/Security')



class SessionRepository {


    constructor () {
        Session.init(DB.connection())   
    }


    async register (userId) {
        const random = Security.random()
        const session = await Session.create({ user: userId, token: random })
        return session ? session.token : false
    }


    async registerOrRetrieve (userId) {

        const session = await Session.findOne({
            where: { user: userId },
            order: [['createdAt', 'DESC']]
        })

        if (session && !this.hasExpired(session)) {
            
        }

        return this.register(userId)
    }


    async isActive (token) {
        let session = await Session.findOne({ where: { token } })

        if (session !== null) {
            session = await this.getIfUnexpired(session.user)

            return (session !== null)
        }

        return false
    }


    hasExpired (session) {
        let createdAtDate = new Date(Date.parse(session.createdAt))
        let expiresTime = (createdAtDate.getTime() + (1 * 24 * 60 * 60 * 1000))
        return (expiresTime < new Date().getTime())
    }
}



module.exports = new SessionRepository()
