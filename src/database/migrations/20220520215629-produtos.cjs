'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produto', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: Sequelize.STRING,
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categoria', key: 'id'},
        ondDelete: 'Restrict'
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('produto');
  }
};
