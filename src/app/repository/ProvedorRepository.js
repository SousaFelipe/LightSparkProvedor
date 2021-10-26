const axios = require('axios').default

const DB = require('../../database/DB')
const Security = require('../../core/Security')

const Provedor = require('../models/Provedor')

const SessionRepository = require('./SessionRepository')



class ProvedorRepository {


    constructor () {
        Provedor.init(DB.connection())
    }


    async authorization () {
        const provedor = await Provedor.findOne({ where: { id: 1 } })
        return Security.encrypted(provedor.token)
    }


    async requestAuthByToken (authorization = '') {

        axios.defaults.headers = {
            authorization: Security.encrypted(authorization)
        }

        const response = await axios.get('http://127.0.0.1:8080/fake/authorization/check')
        const data = response.data

        return data.data.provedor
    }


    async requestAuthBySession (token = '') {
        const session = await SessionRepository.retrieve({ token })

        if (!SessionRepository.expired(session)) {
            const provedor = await Provedor.findOne({ where: { id: session.provedor } })

            return provedor
                ? await this.requestAuthByToken(provedor.token)
                : false
        }

        return false
    }


    async requestSignature () {
        const response = await axios.get('http://127.0.0.1:8080/fake/signature/check')
        const data = response.data
        return data.data.provedor
    }
}


module.exports = new ProvedorRepository()
