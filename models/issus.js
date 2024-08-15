'use strict';
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class issus extends Model {
    static associate(models) {}
  }
  issus.init({
    issus_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: false
    },
    issus_id: {
      type: DataTypes.STRING,
      unique: false
    },
    cycle_uuid: {
      type: DataTypes.UUID,
      unique: false
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    project_uuid: {
      type: DataTypes.UUID,
      unique: false
    },
    issus_title: {
      type: DataTypes.STRING,
      unique: false
    },
    issus_description: {
      type: DataTypes.TEXT,
      unique: true
    },
    issus_dateDebut: {
      type: DataTypes.DATE,
      unique: true
    },
    issus_dateFin: {
      type: DataTypes.DATE,
      unique: true
    },
    issus_type: {
      type: DataTypes.INTEGER,
      unique: true
    },
    issus_priority: {
      type: DataTypes.INTEGER,
      unique: true
    },
    issus_status: {
      type: DataTypes.INTEGER,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'issus',
  });
  return issus;
};