const config = require('../config')



module.exports = {

    up: async (queryInterface, Sequelize) => {
        return await queryInterface.createTable('provedores', {
            id: config.id,

            cnpj: {
                type: Sequelize.STRING(14),
                allowNull: false
            },
            razao: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            nome_fantasia: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            porte: {
                type: Sequelize.STRING(32),
                allowNull: false
            },
            contatos: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            logradouro: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            bairro: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            cep: {
                type: Sequelize.STRING(8),
                allowNull: false
            },
            municipio: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            uf: {
                type: Sequelize.STRING(2),
                allowNull: false
            },
            titular: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            titular_contato: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            class_responsavel: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('P', 'A', 'B', 'C'),
                defaultValue: 'P',
                allowNull: false
            },
            server_url: {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            server_ip: {
                type: Sequelize.STRING(15),
                allowNull: true
            },
            token: {
                type: Sequelize.STRING(96),
                allowNull: true,
            },
            
            ...config.timestamps
        })
    },


    down: async (queryInterface, Sequelize) => {
        return await queryInterface.dropTable('provedores')
    }
};
