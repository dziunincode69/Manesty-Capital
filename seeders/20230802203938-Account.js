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
   const bcrypt = require('bcrypt');
   const datas = JSON.parse(fs.readFileSync("./dummy/user.json")).map(el => {
    el["password"] = bcrypt.hashSync(el["password"],10)
    el["createdAt"] = new Date()
    el["updatedAt"] = new Date()
    return el
   })
   return queryInterface.bulkInsert('Accounts', datas)
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Accounts', null)
  }
};
