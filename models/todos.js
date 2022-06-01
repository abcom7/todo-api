'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    static associate(models) {
      todos.belongsTo(models.users);
      models.users.hasMany(todos);
    }
  }
  todos.init({
    name: DataTypes.STRING,
    completed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todos;
};