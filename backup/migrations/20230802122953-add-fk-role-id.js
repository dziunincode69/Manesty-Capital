'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Accounts', 'RoleId', {
      type: Sequelize.INTEGER,
      references: {
          model: 'Roles',
          key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
  });
  },

   down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Accounts', 'RoleId')
  }
};
