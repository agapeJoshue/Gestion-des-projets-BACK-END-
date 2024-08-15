'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issus_status extends Model {
    static associate(models) {
      // define association here
    }
  }
  issus_status.init({
    etat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    etat_icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'issus_status',
  });
  return issus_status;
};