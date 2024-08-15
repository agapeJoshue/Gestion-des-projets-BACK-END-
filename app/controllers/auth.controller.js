const db = require("../../models");
const Users = db.Users;
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { successResponse, errorResponse, } = require("../services/response.service");
const { dataResponseAuth } = require("../services/auth/response.service");
const { sendEmail_initialize_password } = require("../services/email/email.service");

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    try {
        res.status(200).send(successResponse('Index Controller'));
    } catch (err) {
        res.status(500).send(errorResponse(err));
    }
};

/**
 * Sign In
 * @param {*} req
 * @param {*} res
 */
exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send(errorResponse({ message: "User not found!" }));
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(402).send(errorResponse({ message: "Incorrect password" }));
        }

        const data = await dataResponseAuth(user);

        return res.status(200).send(successResponse({ message: "", user: data }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}

/**
 * Sign Up
 * @param {*} req
 * @param {*} res
 */
exports.signUp = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.user_uuid = uuid.v4();

        const userExist = await Users.findOne({ where: { email: req.body.email } });
        if (userExist) {
            return res.status(409).send(errorResponse({ message: "Email already used by another." }));
        }

        const newUser = await Users.create(req.body);
        const data = await dataResponseAuth(newUser);

        return res.status(200).send(successResponse({ message: "Inscription réussie", user: data }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
};


/**
 * search user account
 * @param {*} req
 * @param {*} res
 */
exports.searchAccount = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send(errorResponse({ message: "User not found!" }));
        }

        const data = await dataResponseAuth(user);

        return res.status(200).send(successResponse({ message: "", user: data }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}

/**
 * reset password
 * @param {*} req
 * @param {*} res
 */
exports.resetPassword = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).send(errorResponse({ message: "Email is required." }));
        }

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send(errorResponse({ message: "User not found." }));
        }

        const dataUser = {
            email,
            username: `${user.firstName} ${user.lastName}`,
            profile: user.profile_path ? user.profile_path : '../../assets/uploads/avatar.png',
        };

        const token = bcrypt.hashSync(email + Date.now(), 10);
        const data = {
            reset_password_token: token,
            reset_password_token_expired: Date.now() + 3600000, // 1 heure
        };

        const sendEmailResult = await sendEmail_initialize_password(dataUser, token);
        if (!sendEmailResult) {
            return res.status(502).send(errorResponse({ message: "Unable to send email." }));
        }

        await Users.update(data, { where: { email } });

        return res.status(200).send(successResponse({ message: "Password reset email sent." }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
};


/**
 * Update password
 * @param {*} req
 * @param {*} res
 */
exports.updatePassword = async (req, reS) => {
    try {
        const { token, newPassword } = req.body;
        const user = await Users.findOne({ where: { reset_password_token: token } });

        if (!user) {
            return res.status(404).send(errorResponse({ message: "User not found!" }));
        }

        const verifyToken = await bcrypt.compare(token, user.reset_password_token);
        if (!verifyToken) {
            return res.send(errorResponse({ message: "Token is invalid." }));
        }

        const tokenExpired = user.reset_password_token_expired <= date.now() ? false : true;

        if (tokenExpired) {
            return res.status(400).send(errorResponse({ message: "Token expired" }));
        }

        const password = await bcrypt.hash(newPassword, 10);

        await Users.update({ password, reset_password_token: "", reset_password_token_expired: "" }, { where: { email: user.email } });
        return res.status(200).send(successResponse({ message: "Password updated successfully." }));
    } catch (err) {
        return res.status(500).send(errorResponse({ message: err.message }));
    }
}