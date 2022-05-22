'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('categoria', [{
      nome: 'categoria1',
    },
    {
      nome: 'categoria2',
    }],{});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('categoria', null, {});
  }
};
