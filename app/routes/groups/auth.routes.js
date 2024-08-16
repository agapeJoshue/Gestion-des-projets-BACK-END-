module.exports = (app, io) => {
  const authController = require("../../controllers/auth.controller");
  const middleware = require("../../middleware/auth.middleware");
  var routes = require("express").Router();

  routes.get('/', middleware, authController.index);
  routes.post('/sign-in', authController.signIn);
  routes.post('/sign-up', authController.signUp);
  routes.get('/search-account', authController.searchAccount);
  routes.post('/reset-password', authController.resetPassword);

  app.use("/api/auth", routes);
};
