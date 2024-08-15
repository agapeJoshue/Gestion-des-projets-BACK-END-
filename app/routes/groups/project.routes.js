module.exports = (app, io) => {
    const projectController = require("../../controllers/project.controller");
    const middleware = require("../../middleware/auth.middleware");
    var routes = require("express").Router();

    routes.get('/', middleware, projectController.getAllProject);
    routes.get('/:project_uuid', middleware, projectController.findProject);
    routes.post('/create', middleware, projectController.createProject);
    routes.put('/update/:project_uuid', middleware, projectController.updateProject);
    routes.delete('/destroy/:project_uuid', middleware, projectController.destroyProject);

    app.use("/api/projects", routes);
};
