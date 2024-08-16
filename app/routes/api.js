// Contains all route used by app
module.exports = (app , io) => {
    require('./groups/auth.routes')(app , io);
    require('./groups/project.routes')(app , io);
    require('./groups/cycle.routes')(app , io);
};