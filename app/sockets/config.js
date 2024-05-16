const { Server } = require('socket.io');
const eventAction = require('../sockets/events');

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    
  });

  eventAction(io);
  return io 
};

module.exports = {
  socket
};