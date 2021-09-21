'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(Model.User)
    }
  };
  Task.init({
    taskname: DataTypes.STRING,
    status: DataTypes.ENUM("Undone","Done"),
    defaultValue: "Undone"
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};