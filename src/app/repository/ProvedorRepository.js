const { Op } = require('sequelize')

const DB = require('../../database/DB')
const Provedor = require('../models/Provedor')



class ProvedorRepository {


    constructor () {
        Provedor.init(DB.connection())
    }



    async activeAuthorization (authorization = '') {

        const provedor = await Provedor.findOne({
            where: {
                [Op.and] : [
                    { token: authorization },
                    { status: 'A' }
                ]
            }
        })

        return (provedor !== null)
    }


    async activeSubscription (server = '') {

        const provedor = await Provedor.findOne({
            where: {
                [Op.or]: [
                    { server_url: server },
                    { server_ip: server }
                ]
            }
        })

        if (provedor && provedor.status === 'A') {
            return {
                subscription: true,
                token: provedor.token
            }
        }

        return {
            subscription: false,
            token: (provedor ? provedor.token : '')
        }
    }
}


module.exports = new ProvedorRepository()
