const db = require("../../models");
const Users = db.Users;
const Sequelize = require('sequelize');

/**
 * fetch info participants
 * @param {*} req
 * @param {*} res
 */
exports.findUserByUUID = async (participants) => {
    try {
        const infoUser = {};
        for (const participant of participants) {
            const user = await Users.findOne({ 
                where: { user_uuid: participant.user_uuid },
                attributes: ["id", "user_uuid", "firstName", "lastName", "email", "role", "sexe", "profile_path", "cover_path", "isValidate"],
             });
            infoUser.push(user);
        }
        return infoUser;
    } catch (err) {
        throw new Error(err.message);
    }
}


/**
 * find all users
 * @param {*} req
 * @param {*} res
 */
exports.findAllUsers = async () => {
    try{
        return await Users.findAll({ 
            where: { isValidate: true },
            attributes: ["id", "user_uuid", "firstName", "lastName", "email", "role", "sexe", "profile_path", "cover_path", "isValidate"],
        });
    }catch(err){
        throw new Error(err.message)
    }
}


/**
 * find all users (autre que user connecté)
 * @param {*} req
 * @param {*} res
 */
exports.findUsers = async (user_uuid) => {
    try{
        return await Users.findAll({
            where: {
                user_uuid: {
                    [Sequelize.Op.ne]: user_uuid
                }
            }
        });
    }catch(err){
        throw new Error(err.message);
    }
}


/**
 * find ONE users
 * @param {*} req
 * @param {*} res
 */
exports.findOneUsers = async (user_uuid) => {
    try{
        return await Users.findOne({
            where: { isValidate: true, user_uuid },
            attributes: ["id", "user_uuid", "firstName", "lastName", "email", "role", "sexe", "profile_path", "cover_path", "isValidate"],
        });
    }catch(err){
        throw new Error(err.message)
    }
}