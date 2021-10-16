const { Model, DataTypes } = require('sequelize')



class Provedor extends Model {


    static init (sequelize) {
        super.init({
            cnpj: DataTypes.STRING,
            razao: DataTypes.STRING,
            nome_fantasia: DataTypes.STRING,
            contatos: DataTypes.STRING,
            logradouro: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cep: DataTypes.STRING,
            municipio: DataTypes.STRING,
            status: DataTypes.ENUM('P', 'A', 'B', 'C'),
            server_url: DataTypes.STRING(64),
            server_ip: DataTypes.STRING(15),
            token: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Provedor',
            tableName: 'provedor'
        })
    }
}



module.exports = Provedor
