const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.dataResponseAuth = async (user) => {
    try{
        const token = await jwt.sign({ email: user.email }, config.secretKey, {
            expiresIn: config.expiresIn,
        });

        const formData = {
            token,
            user_uuid: user.user_uuid,
            user_id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            role: user.role,
            isValidate: user.isValidate,
            sexe: user.sexe,
            profile_path: user.profile_path,
            cover_path: user.cover_path,
        };
        
        return formData
    }catch(err){
        throw new Error(err.message);
    }
}

exports.generateResetToken = (user) => {
    try {
        const token = bcrypt.hashSync(user.email + Date.now(), 10);
        user.reset_password_token = token;
        user.reset_password_expires = Date.now() + 3600000;
        user.save();
        return token;
    } catch (err) {
        throw new Error(err.message)
    }
};

exports.code_token = () => {
    return Math.floor(100000 + Math.random() * 900000);
}