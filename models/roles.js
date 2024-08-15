'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      // define association here
    }
  }
  roles.init({
    role_title: {
      type: DataTypes.STRING,
      unique: false
    },
    role_description: {
      type: DataTypes.TEXT,
      unique: false
    },
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};