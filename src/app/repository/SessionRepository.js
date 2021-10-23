const DB = require('../../database/DB')
const Session = require('../models/Session')
const Security = require('../../core/Security')



class SessionRepository {


    constructor () {
        Session.init(DB.connection())   
    }


    async retrieve (where = {}) {

        const session = await Session.findOne({
            where: { ...where, loggedout: 'N' },
            order: [['updatedAt', 'DESC']]
        })

        return (session != null)
            ? session : false
    }


    async registerOrRetrieve (userId = 0, retrieve = false) {
        let session = await this.retrieve({ user: userId })

        if (session && !this.hasExpired(session)) {

            session.changed('updatedAt', true)
            session = await session.save()
            
            return session.token
        }

        const registered = await Session.create({
            user: userId,
            token: Security.random()
        })

        return (registered != null)
            ? retrieve ? registered : registered.token
            : false
    }


    async logout (token) {
        let session = await this.retrieve({ token })

        if (session) {
            const result = await Session.update({ loggedout: 'S' }, { where: { token } })
            return { loggedout: result }
        }

        return (session && session.loggedout == 'S')
            ? { loggedout: true }
            : { loggedout: false }
    }


    hasExpired (session) {
        if (!session) return false

        let updatedAt = new Date(Date.parse(session.updatedAt))
        let expiresTime = (updatedAt.getTime() + (1 * 24 * 60 * 60 * 1000))

        return (expiresTime < new Date().getTime())
    }
}



module.exports = new SessionRepository()
