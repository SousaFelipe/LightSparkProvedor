const Sequelize = require('sequelize')
const config = require('../config/database')



class DB {


    constructor () {
        this.sequelize = new Sequelize(config)
    }

    
    connection () {
        return this.sequelize
    }


    close () {
        this.sequelize.close()
    }
}



module.exports = new DB()
