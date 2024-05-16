const db = require("../../models");
const Users = db.users;
const { successResponse, errorResponse, } = require("../services/response.service");

/**
 * Get all user 
 * @param {*} defis_users
 * @returns
 */
exports.getAllDefis = async (req, res) => {
    try {
        const UserLists = await Users.findAll();
        res.status(200).send(successResponse(UserLists));
    } catch (err) {
        res.status(500).send(errorResponse(err));
    }
};