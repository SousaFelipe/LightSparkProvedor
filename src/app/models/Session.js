const { Model, DataTypes } = require('sequelize')



class Session extends Model {

    
    static init (sequelize) {
        super.init({
            user: DataTypes.INTEGER,
            token: DataTypes.STRING(64)
        }, {
            sequelize,
            modelName: 'Session',
            tableName: 'sessions'
        })
    }
}



module.exports = Session
