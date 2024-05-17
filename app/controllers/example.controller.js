const db = require("../../models");
const Users = db.Users;
const { successResponse, errorResponse, } = require("../services/response.service");

/**
 * Get all user 
 * @param {*} req
 * @param {*} res
 */
exports.getAllUsers = async (req, res) => {
    try {
        const UserLists = await Users.findAll();
        res.status(200).send(successResponse(UserLists));
    } catch (err) {
        res.status(500).send(errorResponse(err));
    }
};