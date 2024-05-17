module.exports = (app , io) => {
    const controller = require("../../controllers/example.controller");
    var routes = require("express").Router();
   
    //  router.post("/", controller.routePost(io));
    //  router.get("/", controller.routeGet);
    routes.get('/all', controller.getAllUsers);
  
    app.use("/api", routes);
  };
  