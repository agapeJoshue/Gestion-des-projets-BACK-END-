const db = require("../../models");
const project = db.Projects;
const participants = db.participants;
const uuid = require('uuid');
const { successResponse, errorResponse, } = require("../services/response.service");
const { findUserByUUID } = require("../services/users.service");

/**
 * find all project
 * @param {*} req
 * @param {*} res
 */
exports.getAllProject = async (req, res) => {
    try {
        const projects = await project.findAll({ where: { isDeleted: false } });
        if (!projects) {
            return res.status(404).send(errorResponse({ message: "No project found or database is empty." }));
        }
        for (const project of projects) {
            const userParticipants = await participants.findAll({ where: { project_uuid: project.project_uuid } });
            const user = await findUserByUUID(userParticipants);
            project.dataValues.infoParticipants = user;
        }
        return res.status(200).send(successResponse({ message: "lists all projects", projects }));
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
        const project = await project.findOne({ where: { isDeleted: false, project_uuid } });
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

        await project.create(newProject);

        const users = req.body.participants;
        users.push(req.body.user_uuid);

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

        const project = await project.findOne({ where: { project_uuid } });
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

        const project = await project.findOne({ where: { project_uuid } });
        if (!project) {
            return res.send(errorResponse({ message: "Project not found" }));
        }

        await participants.destroy({ where: { project_uuid } });

        await project.destroy({ where: { project_uuid } });

        return res.status(200).send(successResponse({ message: "Project deleted successfully." }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}