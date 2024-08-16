const db = require("../../models");
const CYCLE = db.cycles;
const uuid = require('uuid');
const { successResponse, errorResponse, } = require("../services/response.service");
const { getCycleByStatus } = require('../services/cycle.service');
const { findProjectByUUID } = require("../services/project.service");

/**
 * find all cycle
 * Status cycle :  1 => Actif , 2 => Terminer, 0 => Arrièrer
 * @param {*} req
 * @param {*} res
 */
exports.getAllCycle = async (req, res) => {
    try {
        const status = { 'actif': 1, 'terminer': 2, 'arriere': 0 };
        const { type_status } = req.params;

        const cycles = await getCycleByStatus(status[type_status]);

        if (!cycles) {
            return res.send(errorResponse({ message: "No cycle found or database is empty!" }));
        }

        for (const cycle of cycles) {
            console.log("project uuid : ", cycle.project_uuid);
            const project = await findProjectByUUID(cycle.project_uuid);
            cycle.dataValues.projectInfo = project;
        }
        console.log(cycles);
        return res.status(200).send(successResponse({ message: "", cycles }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}

/**
 * find all cycle
 * @param {*} req
 * @param {*} res
 */
exports.findCycle = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}

/**
 * Create new cycle
 * @param {*} req
 * @param {*} res
 */
exports.createCycle = async (req, res) => {
    try {
        const dataBody = {};
        dataBody.createdBy = req.params.user_uuid;
        dataBody.status_cycle = 1;
        dataBody.cycle_uuid = uuid.v4();
        dataBody.project_uuid = req.body.project_uuid;
        dataBody.title_cycle = req.body.title_cycle;
        if (req.body.description_cycle) dataBody.description_cycle = req.body.description_cycle;
        if (req.body.date_debut) dataBody.date_debut = req.body.date_debut;
        if (req.body.date_fin) dataBody.date_fin = req.body.date_fin;

        const cycle = await CYCLE.findAll({ where: { project_uuid: req.body.project_uuid, status_cycle: 1 } });
        if (cycle.length > 0) {
            return res.send(errorResponse({ message: "Vous avez déjà un cycle en cours dans ce projet." }));
        }
        console.log("dataBody : ", dataBody);
        const newCycle = await CYCLE.create(dataBody);

        return res.status(200).send(successResponse({ message: "Cycle created successfully.", newCycle }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}

/**
 * update cycle
 * @param {*} req
 * @param {*} res
 */
exports.updateCycle = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}

/**
 * destroy / delete cycle
 * @param {*} req
 * @param {*} res
 */
exports.destroyCycle = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}