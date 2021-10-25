const { Op } = require('sequelize')

const Security = require('../../core/Security')

const Response = require('../../core/Response')
const Provedor = require('../models/Provedor')



class FakeMaster {


    async signature (request, response) {
        const server = request.headers.host

        const provedor = await Provedor.findOne({
            where: {
                [Op.or]: [
                    { server_url: server },
                    { server_ip: server }
                ]
            },
            attributes: ['id', 'status', 'token']
        })

        return new Response(response).json({
            provedor: (provedor != null) ? provedor.dataValues : false
        })
    }


    async authorization (request, response) {

        const authorization = request.headers.authorization
        const decrypted = Security.decrypted(authorization)

        const provedor = await Provedor.findOne({
            where: { token: decrypted },
            attributes: ['id', 'status', 'token']
        })

        return new Response(response).json({
            provedor: provedor ? provedor.dataValues : false
        })
    }
}



module.exports = new FakeMaster()
