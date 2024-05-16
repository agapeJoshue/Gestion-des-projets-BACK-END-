// Load environment variables from .env file
require("dotenv").config();
const http = require('http');
const {socket} = require('./app/sockets/config');
const app = require("./app/middleware/bodyParserMiddleware");

// Define a route to handle the root URL
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my api"});
});
const server = http.createServer(app);
const io = socket(server)
require("./app/routes/api")(app,io);

// Set the server's port and start listening for requests
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
