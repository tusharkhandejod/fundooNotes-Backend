const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox167accba116b45c4b54ffcf279f57d39.mailgun.org';
const mg = mailgun({ apiKey: 'd9aad42a28ba0a1f4c36eadff63440d4-6e0fd3a4-eb5293c6', domain: DOMAIN });
const _ = require('lodash');
const User = require('../Model/userModel');
var nodemailer = require('nodemailer');
const { compareSync } = require('bcrypt');




module.exports.sendMail = function (token, email, URL) {

    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tusharkhandejod01@gmail.com',
            pass: process.env.myEmailPass
        }
    });


    var mailOptions = {
        from: 'tusharkhandejod01@gmail.com',
        to: email,
        subject: 'Reset Password link',
        html: `
               <h1>Please click on the given link for resetting the password</h1>
               <p><a>${URL}</a></p>`
    };

    transporter.sendMail(mailOptions, function (error, success) {
        if (error) {
            console.log(error)
        } else if (success) {
            console.log('Email send from nodemailer file')
        }
    })

}
