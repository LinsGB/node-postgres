'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('produto', [{
      nome: 'produto1',
      categoria_id: 1
    },
    {
      nome: 'produto2',
      categoria_id: 1
    }],{});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('produto', null, {});
  }
};
