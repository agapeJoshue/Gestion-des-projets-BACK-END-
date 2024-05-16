const db = require('../../models');
const Sequelize = require('sequelize');
const { users } = db;

const eventAction = (io) => {
  const userListing = new Set();
  io.on('connection', async(socket) => {

    socket.on('example', (data) => {
      io.emit('callBack', data);
    });
    
  });
};

module.exports = eventAction;
