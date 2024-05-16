module.exports = (app , io) => {
    const controller = require("../../controllers/example.controller");
    var router = require("express").Router();
   
    //  router.post("/", controller.routePost(io));
    //  router.get("/", controller.routeGet);
  
    app.use("/api", router);
  };
  