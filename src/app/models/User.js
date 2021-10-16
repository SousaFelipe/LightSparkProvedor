const { Model, DataTypes } = require('sequelize')



class User extends Model {


    static init (sequelize) {
        super.init({
            name: DataTypes.STRING(96),
            email: DataTypes.STRING(96),
            password: DataTypes.STRING(96),
            remember_token: DataTypes.STRING(96)
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users'
        })
    }
}



module.exports = User
