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

        let session = await Session.findOne({
            where: { user: userId },
            order: [['updatedAt', 'DESC']]
        })

        if (session && !this.hasExpired(session)) {

            session.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')
            session = await session.save()
            
            return session.token
        }

        const newSession = this.register(userId)

        return newSession
            ? newSession.token : false
    }


    hasExpired (session) {
        if (!session) return false

        let updatedAt = new Date(Date.parse(session.updatedAt))
        let expiresTime = (updatedAt.getTime() + (1 * 24 * 60 * 60 * 1000))

        return (expiresTime < new Date().getTime())
    }
}



module.exports = new SessionRepository()
