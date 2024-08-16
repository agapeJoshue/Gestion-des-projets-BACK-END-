module.exports = (app, io) => {
    const cycleController = require("../../controllers/cycle.controller");
    const middleware = require("../../middleware/auth.middleware");
    var routes = require("express").Router();

    routes.get('/:type_status', cycleController.getAllCycle);
    routes.get('/:cycle_uuid', cycleController.findCycle);
    routes.post('/create/:user_uuid', middleware, cycleController.createCycle);
    routes.put('/update/:cycle_uuid', middleware, cycleController.updateCycle);
    routes.delete('/destroy/:cycle_uuid', middleware, cycleController.destroyCycle);

    app.use("/api/cycles", routes);
};
