const config = require('../config')



module.exports = {

    up: async (queryInterface, Sequelize) => {
        return await queryInterface.createTable('users', {
            id: config.id,

            name: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(96),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(96),
                allowNull: false
            },
            remember_token: {
                type: Sequelize.STRING(96),
                allowNull: true
            },
            session: {
                type: Sequelize.STRING(64),
                allowNull: true
            }
            
            ...config.timestamps
        })
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.dropTable('users')
    }
}
