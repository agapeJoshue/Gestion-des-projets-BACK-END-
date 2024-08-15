'use strict';
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class cessionnaires extends Model {
    static associate(models) {
      // define association here
    }
  }
  cessionnaires.init({
    cycle_uuid: {
      type: DataTypes.UUID,
      unique: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'cessionnaires',
  });
  return cessionnaires;
};