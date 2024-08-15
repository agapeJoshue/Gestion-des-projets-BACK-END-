const db = require("../../models");
const PROJECT = db.Projects;
const participants = db.participants;
const uuid = require('uuid');
const { successResponse, errorResponse, } = require("../services/response.service");
const { findUserByUUID, findUsers } = require("../services/users.service");

/**
 * find all project
 * @param {*} req
 * @param {*} res
 */
exports.getAllProject = async (req, res) => {
    try {
        const { user_uuid } = req.params;

        const projects = await participants.findAll({
            where: { user_uuid },
            attributes: ["project_uuid"],
        });

        if (projects.length === 0) {
            return res.send(errorResponse({ message: "No project found or database is empty." }));
        }

        const projectData = await Promise.all(projects.map(async (project) => {
            const projectInfo = await PROJECT.findOne({
                where: { isDeleted: false, project_uuid: project.project_uuid }
            });

            if (!projectInfo) {
                return null; 
            }

            const userParticipants = await participants.findAll({
                where: { project_uuid: project.project_uuid }
            });

            const user = await findUserByUUID(userParticipants);
            projectInfo.dataValues.infoParticipants = user;

            return projectInfo.dataValues;
        }));

        const filteredProjectData = projectData.filter(data => data !== null);

        return res.status(200).send(successResponse({ message: "List of all projects", projectData: filteredProjectData }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}



/**
 * find users
 * @param {*} req
 * @param {*} res
 */
exports.findUsers = async (req, res) => {
    try {
        const { user_uuid } = req.params;

        const users = await findUsers(user_uuid);
        if (!users) {
            return res.send(errorResponse({ message: "Users not found!" }));
        }

        return res.status(200).send(successResponse({ message: "Lists users", users }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}


/**
 * find project by project UUID
 * @param {*} req
 * @param {*} res
 */
exports.findProject = async (req, res) => {
    try {
        const { project_uuid } = req.params;
        const project = await PROJECT.findOne({ where: { isDeleted: false, project_uuid } });
        if (!project) {
            return res.status(404).send(errorResponse({ message: "No project found or database is empty." }));
        }
        const userParticipants = await participants.findAll({ where: { project_uuid: project.project_uuid } });
        const user = await findUserByUUID(userParticipants);
        project.dataValues.infoParticipants = user;

        return res.status(200).send(successResponse({ message: "Info project", project }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}


/**
 * Create a new project
 * @param {*} req
 * @param {*} res
 */
exports.createProject = async (req, res) => {
    try {
        const newProject = {};
        const newUUID = uuid.v4();
        newProject.project_uuid = newUUID;
        newProject.user_uuid = req.body.user_uuid;
        newProject.identifiant = req.body.identifiant;
        newProject.title = req.body.title;
        if (req.body.theme) newProject.theme = req.body.theme;
        if (req.body.description) newProject.description = req.body.description;

        const users = req.body.participants;
        users.push(req.body.user_uuid);

        console.log(users);

        await PROJECT.create(newProject);

        for (const user_uuid of users) {
            await participants.create({ project_uuid: newUUID, user_uuid });
        }

        return res.status(200).send(successResponse({ message: "Project created successfully.", newProject }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}


/**
 * find project by project UUID
 * @param {*} req
 * @param {*} res
 */
exports.updateProject = async (req, res) => {
    try {
        const newData = {};
        const { project_uuid } = req.params;

        const project = await PROJECT.findOne({ where: { project_uuid } });
        if (!project) {
            return res.send(errorResponse({ message: "Project not found" }));
        }

        if (req.body.identifiant) newData.identifiant = req.body.identifiant;
        if (req.body.title) newData.title = req.body.title;
        if (req.body.theme) newData.theme = req.body.theme;
        if (req.body.description) newData.description = req.body.description;
        if (req.body.status) newData.status = req.body.status;
        if (req.body.isDeleted) newData.isDeleted = req.body.isDeleted;

        await project.update(newData, { where: { project_uuid } });

        return res.status(200).send(successResponse({ message: "Project updated successfully." }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}


/**
 * find project by project UUID
 * @param {*} req
 * @param {*} res
 */
exports.destroyProject = async (req, res) => {
    try {
        const { project_uuid } = req.params;

        const project = await PROJECT.findOne({ where: { project_uuid } });
        if (!project) {
            return res.send(errorResponse({ message: "Project not found" }));
        }

        await participants.destroy({ where: { project_uuid } });

        await PROJECT.destroy({ where: { project_uuid } });

        return res.status(200).send(successResponse({ message: "Project deleted successfully." }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}