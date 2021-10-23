const { Op } = require('sequelize')

const DB = require('../../database/DB')
const Provedor = require('../models/Provedor')



class ProvedorRepository {


    constructor () {
        Provedor.init(DB.connection())
    }


    async getServerAuth (server = '') {

        const provedor = await Provedor.findOne({
            where: {
                [Op.or]: [
                    { server_url: server },
                    { server_ip: server }
                ]
            }
        })

        return (provedor != null) ? provedor : false
    }


    async getTokenAuth (authorization = '') {

        const provedor = await Provedor.findOne({
            where: { token: authorization }
        })

        return (provedor != null) ? provedor : false
    }
}


module.exports = new ProvedorRepository()
