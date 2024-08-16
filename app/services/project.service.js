const db = require("../../models");
const PROJECT = db.Projects;

exports.findProjectByUUID = async (project_uuid) => {
    try {
        return await PROJECT.findOne({ where: { project_uuid } });
    } catch (err) {
        throw new Error(err.message);
    }
}