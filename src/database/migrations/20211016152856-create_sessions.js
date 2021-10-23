const config = require('../config')



module.exports = {

    up: async (queryInterface, Sequelize) => {
        return await queryInterface.createTable('sessions', {
            id: config.id,

            user: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            token: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
            },
            loggedout: {
                type: Sequelize.ENUUM('N', 'S'),
                defaultValue: 'N',
                allowNull: false
            },
            
            ...config.timestamps,
        })
    },


    down: async (queryInterface, Sequelize) => {
        return await queryInterface.dropTable('sessions')
    }
};
