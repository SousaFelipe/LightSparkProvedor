const DB = require('../../database/DB')
const Session = require('../models/Session')
const Security = require('../../core/Security')



class SessionRepository {


    constructor () {
        Session.init(DB.connection())   
    }


    async register (userId) {

        const session = await Session.create({
            user: userId,
            token: Security.random()
        })

        return session ? session : false
    }


    async retrieve (token = '') {
        const session = await Session.findOne({ where: { token } })
        return (session != null)
            ? session : false
    }


    async registerOrRetrieve (userId = 0) {

        const session = await Session.findOne({
            where: { user: userId },
            order: [['createdAt', 'DESC']]
        })

        if (session && !this.hasExpired(session)) {
            return session.token
        }

        const registeredSession = this.register(userId)

        return registeredSession
            ? registeredSession.token
            : false
    }


    hasExpired (session) {
        if (!session) return false

        let createdAtDate = new Date(Date.parse(session.createdAt))
        let expiresTime = (createdAtDate.getTime() + (1 * 24 * 60 * 60 * 1000))

        return (expiresTime < new Date().getTime())
    }
}



module.exports = new SessionRepository()
