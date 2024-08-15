require('dotenv').config();
const config = require("../config/config");
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config.USER,
        pass: config.PASS
    }
});

const subjects = {
    0: `Activation du compte ${process.env.APP_NAME}`,
    1: `Réinitialisation du mot de passe du compte ${process.env.APP_NAME}`,
    2: `Modificationdu mot de passe du compte ${process.env.APP_NAME}`,
};

function masquerEmail(email) {
    const index = email.indexOf('@');
    const identifiant = email.substring(0, index);
    const emailMasque = `${identifiant.substr(0, 2)}***${identifiant.substr(-2)}${email.substring(index)}`;
    return emailMasque;
}

exports.sendEmail_Activation_account = async (to, name, code) => {
    try {

        const pathLogo = process.env.LOGO_APP;
        const emailParams = {
            app_name: " " + process.env.APP_NAME,
            username: name,
            code: code,
            mail: masquerEmail(to),
            pathLogo: pathLogo
        };

        const emailHtml = await ejs.renderFile(path.join(__dirname, '../../../view/activate_account.email.ejs'), emailParams);

        const mailOptions = {
            from: {
                name: process.env.APP_NAME,
                address: config.USER
            },
            to: [to],
            subject: subjects[0],
            html: emailHtml,
        };

        return await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error :', err.message);
        throw new Error(err.message);
    }
}

exports.sendEmail_initialize_password = async (userData, token) => {
    try {
        const emailParams = {
            app_name: process.env.APP_NAME,
            myURL: `${process.env.baseURL}/forgot-password/reset-password/${token}`,
            mail: masquerEmail(userData.email),
        };

        const emailHtml = await ejs.renderFile(
            path.join(__dirname, '../../../view/reinitialization.email.ejs'),
            emailParams
        );

        const mailOptions = {
            from: {
                name: process.env.APP_NAME,
                address: config.USER,
            },
            to: userData.email,
            subject: subjects[1],
            html: emailHtml,
        };

        return await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error:', err.message);
        throw new Error(err.message);
    }
};

exports.sendEmail_update_password = async (to) => {
    try {
        const pathLogo = process.env.LOGO_APP;
        const emailParams3 = {
            app_name: " " + process.env.APP_NAME,
            mail: masquerEmail(to),
            pathLogo: pathLogo
        };

        const emailHtml = await ejs.renderFile(path.join(__dirname, '../../../view/update_mot_de_passe.email.ejs'), emailParams3);

        const mailOptions = {
            from: {
                name: process.env.APP_NAME,
                address: config.USER
            },
            to: [to],
            subject: subjects[2],
            html: emailHtml,
        };

        return await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error :', err.message);
        throw new Error(err.message);
    }
}