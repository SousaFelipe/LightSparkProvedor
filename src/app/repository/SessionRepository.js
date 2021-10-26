const DB = require('../../database/DB')
const Session = require('../models/Session')
const Security = require('../../core/Security')



class SessionRepository {


    constructor () {
        Session.init(DB.connection())   
    }


    async registerOrRetrieve (user, retrieve = false) {
        
        let session = await this.retrieve({
            user: user.id,
            provedor: user.provedor
        })

        if (!this.expired(session)) {
            session.changed('updatedAt', true)
            session = await session.save()
            return retrieve ? session : session.token
        }

        const registered = await Session.create({
            user: user.id,
            provedor: user.provedor,
            token: Security.random()
        })

        return (registered != null)
            ? retrieve ? registered : registered.token
            : false
    }


    async retrieve (where = {}) {

        const session = await Session.findOne({
            where: { ...where, loggedout: 'N' },
            order: [['updatedAt', 'DESC']],
            attributes: this.attributes
        })

        return (session != null)
            ? session : false
    }


    async destroy (token) {
        let session = await this.retrieve({ token })

        if (session) {
            session.loggedout = 'S'
            session = await session.save({ fields: ['loggedout'] })
            return { loggedout: session.loggedout == 'S' }
        }

        return (session && session.loggedout == 'S')
            ? { loggedout: true }
            : { loggedout: false }
    }


    expired (session) {
        const empty = (session == false || session == null || session == undefined)
        const loggedout = (session && session.loggedout == 'S')

        if (empty || loggedout) {
            return true
        }

        let updatedAt = new Date(Date.parse(session.updatedAt))
        let expiresTime = (updatedAt.getTime() + (1 * 24 * 60 * 60 * 1000))
        return (expiresTime < new Date().getTime())
    }
}



module.exports = new SessionRepository()
