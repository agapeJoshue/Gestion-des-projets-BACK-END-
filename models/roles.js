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
      allowNull: false
    },
    role_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};