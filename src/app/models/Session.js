const { Model, DataTypes } = require('sequelize')



class Session extends Model {


    static init (sequelize) {
        super.init({
            user: DataTypes.INTEGER,
            provedor: DataTypes.INTEGER,
            token: DataTypes.STRING(64),
            loggedout: DataTypes.ENUM('N', 'S')
        }, {
            sequelize,
            modelName: 'Session',
            tableName: 'sessions'
        })
    }
}



module.exports = Session
