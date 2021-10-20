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

        return session
            ? session.token
            : false
    }


    async isActive (token) {
        const session = await Session.findOne({ where: { token } })

        if (session !== null) {
            session = await this.getIfUnexpired(session.user)
            return (session !== null)
        }

        return false
    }


    async getIfUnexpired (userId) {
        const session = await Session.findOne({ where: { user: userId } })

        if (session !== null) {
            let createdAtDate = new Date(Date.parse(session.createdAt))
            let expiresDate = (createdAtDate.getTime() + (1 * 24 * 60 * 60 * 1000))
            return (expiresDate > new Date().getTime()) ? session.token : false
        }

        return false
    }
}



module.exports = new SessionRepository()
