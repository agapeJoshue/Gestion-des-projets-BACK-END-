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
        allowNull: false
      },
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      project_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      issus_title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      issus_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      issus_dateDebut: {
        type: Sequelize.DATE,
        allowNull: true
      },
      issus_dateFin: {
        type: Sequelize.DATE,
        allowNull: true
      },
      issus_type: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      issus_priority: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      issus_status: {
        type: Sequelize.INTEGER,
        allowNull: true
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