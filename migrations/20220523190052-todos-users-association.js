
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('todos', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'todo_user_association',
      references: {
        table: 'users',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('todos','todo_user_association');
  }
};
