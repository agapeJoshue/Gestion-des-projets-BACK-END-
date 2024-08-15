'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('issus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      issus_uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: false
      },
      issus_id: {
        type: Sequelize.STRING,
        unique: false
      },
      cycle_uuid: {
        type: Sequelize.UUID,
        unique: false
      },
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      project_uuid: {
        type: Sequelize.UUID,
        unique: false
      },
      issus_title: {
        type: Sequelize.STRING,
        unique: false
      },
      issus_description: {
        type: Sequelize.TEXT,
        unique: true
      },
      issus_dateDebut: {
        type: Sequelize.DATE,
        unique: true
      },
      issus_dateFin: {
        type: Sequelize.DATE,
        unique: true
      },
      issus_type: {
        type: Sequelize.INTEGER,
        unique: true
      },
      issus_priority: {
        type: Sequelize.INTEGER,
        unique: true
      },
      issus_status: {
        type: Sequelize.INTEGER,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('issus');
  }
};