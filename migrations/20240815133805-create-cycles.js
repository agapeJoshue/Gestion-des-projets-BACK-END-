'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cycles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cycle_uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      project_uuid: {
        type: Sequelize.UUID,
        unique: true
      },
      title_cycle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description_cycle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_debut: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_fin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status_cycle: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('cycles');
  }
};