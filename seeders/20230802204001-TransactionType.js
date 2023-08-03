'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const fs = require('fs');
   const datas = JSON.parse(fs.readFileSync("./dummy/TransactionType.json")).map(el => {
    el["createdAt"] = new Date()
    el["updatedAt"] = new Date()
    return el
   })
   return queryInterface.bulkInsert('TransactionTypes', datas)
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('TransactionTypes', null)
  }
};
