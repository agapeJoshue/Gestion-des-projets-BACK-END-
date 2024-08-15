'use strict';
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class participants extends Model {
    static associate(models) {
    }
  }
  participants.init({
    project_uuid: {
      type: DataTypes.UUID,
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'participants',
  });
  return participants;
};