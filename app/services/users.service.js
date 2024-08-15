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
        const infoUser = await Promise.all(participants.map(async (participant) => {
            const user = await Users.findOne({
                where: { user_uuid: participant.user_uuid },
                attributes: ["id", "user_uuid", "firstName", "lastName", "email", "role", "sexe", "profile_path", "cover_path", "isValidate"],
            });
            const firstName = user.firstName;
            const indiceFirstName = firstName.charAt(0);
            const lastName = user.lastName;
            const indiceLastName = lastName.charAt(0);
            const indice = `${indiceFirstName}${indiceLastName}`;
            const username = `${firstName} ${lastName}`;
            user.dataValues.indice = indice;
            user.dataValues.username = username;
            return user;
        }));
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
    try {
        return await Users.findAll({
            where: { isValidate: true },
            attributes: ["id", "user_uuid", "firstName", "lastName", "email", "role", "sexe", "profile_path", "cover_path", "isValidate"],
        });
    } catch (err) {
        throw new Error(err.message)
    }
}


/**
 * find all users (autre que user connecté)
 * @param {*} req
 * @param {*} res
 */
exports.findUsers = async (user_uuid) => {
    try {
        const users = await Users.findAll({
            where: {
                user_uuid: {
                    [Sequelize.Op.ne]: user_uuid
                }
            },
            attributes: ["id", "user_uuid", "firstName", "lastName", "email", "role", "sexe", "profile_path", "cover_path", "isValidate"],
        });

        for (const user of users) {
            const firstName = user.firstName;
            const indiceFirstName = firstName.charAt(0);
            const lastName = user.lastName;
            const indiceLastName = lastName.charAt(0);
            const indice = `${indiceFirstName}${indiceLastName}`;
            const username = `${firstName} ${lastName}`;
            user.dataValues.indice = indice;
            user.dataValues.username = username;
        }

        return users
    } catch (err) {
        throw new Error(err.message);
    }
}


/**
 * find ONE users
 * @param {*} req
 * @param {*} res
 */
exports.findOneUsers = async (user_uuid) => {
    try {
        return await Users.findOne({
            where: { isValidate: true, user_uuid },
            attributes: ["id", "user_uuid", "firstName", "lastName", "email", "role", "sexe", "profile_path", "cover_path", "isValidate"],
        });
    } catch (err) {
        throw new Error(err.message)
    }
}