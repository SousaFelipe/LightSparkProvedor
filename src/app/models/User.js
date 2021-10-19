const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')



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

        super.beforeCreate((user, options) => {
            return bcrypt.hash()
                .then(hash => {
                    user.password = hash
                })
                .catch(error => {
                    throw new Error(error)
                })
        })
    }
}



module.exports = User
