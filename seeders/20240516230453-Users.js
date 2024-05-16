'use strict';

const db = require("../models");
const users = db.Users;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const countUser = await users.count();

    if (countUser === 0) {
      const userData = [
        {
          nom: 'John Doe',
          email: 'joth@em.com'
        },
        {
          nom: 'Joshué Agapé',
          email: 'joshueagape@gmail.com'
        }
      ];
      await users.bulkCreate(userData);
    }

    const newData = {
      nom: "example",
      email: "example@fe.fr",
    };

    // Vérifier si cette notification n'existe pas déjà
    const existsUser = await users.findOne(
      {
        where: {
          nom: newData.nom,
          email: newData.email,
        },
      }
    );

    // Si la notification n'existe pas, l'ajouter
    if (!existsUser) {
      await users.bulkCreate([newData]);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
