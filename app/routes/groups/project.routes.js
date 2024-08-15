module.exports = (app, io) => {
    const projectController = require("../../controllers/project.controller");
    const middleware = require("../../middleware/auth.middleware");
    var routes = require("express").Router();

    routes.get('/:user_uuid', middleware, projectController.getAllProject);
    routes.get('/get-users/:user_uuid', middleware, projectController.findUsers);
    routes.get('/:project_uuid', middleware, projectController.findProject);
    routes.post('/create', middleware, projectController.createProject);
    routes.put('/update/:project_uuid', middleware, projectController.updateProject);
    routes.delete('/destroy/:project_uuid', middleware, projectController.destroyProject);

    app.use("/api/projects", routes);
};
