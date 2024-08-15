'use strict';
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class cycles extends Model {
    static associate(models) {
    }
  }
  cycles.init({
    cycle_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    project_uuid: {
      type: DataTypes.UUID,
      unique: true
    },
    title_cycle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description_cycle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status_cycle: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  }, {
    sequelize,
    modelName: 'cycles',
  });
  return cycles;
};