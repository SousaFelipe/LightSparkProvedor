const axios = require('axios').default

const DB = require('../../database/DB')
const Provedor = require('../models/Provedor')

const Security = require('../../core/Security')



class ProvedorRepository {


    constructor () {
        Provedor.init(DB.connection())
    }


    async authorization () {
        const provedor = await Provedor.findOne({ where: { id: 1 } })
        return Security.encrypted(provedor.token)
    }


    async requestAuthorization (authorization = '') {
        axios.defaults.headers = { authorization }

        const response = await axios.get('http://127.0.0.1:8080/fake/authorization/check')
        const data = response.data

        return data.data.provedor
    }


    async requestSignature () {
        const response = await axios.get('http://127.0.0.1:8080/fake/signature/check')
        const data = response.data
        return data.data.provedor
    }
}


module.exports = new ProvedorRepository()
