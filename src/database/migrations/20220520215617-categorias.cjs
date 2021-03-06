'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categoria', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: Sequelize.STRING,
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('categoria');
  }
};
