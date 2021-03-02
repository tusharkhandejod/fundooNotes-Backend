const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox167accba116b45c4b54ffcf279f57d39.mailgun.org';
const mg = mailgun({ apiKey: 'd9aad42a28ba0a1f4c36eadff63440d4-6e0fd3a4-eb5293c6', domain: DOMAIN });
const _ = require('lodash');
const User = require('../Model/userModel');
var nodemailer = require('nodemailer');
const { compareSync } = require('bcrypt');




module.exports.sendMail = function (token, email) {

    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tusharkhandejod01@gmail.com',
            pass: 'Manju@8605'
        }
    });


    var mailOptions = {
        from: 'tusharkhandejod01@gmail.com',
        to: email,
        subject: 'Reset Password link',
        html: `
               <h2>Please click on the given link for resetting the password</h2>
               <p><a>http://localhost:5000/api/resetPassword/${token}</a></p>`
    };

    transporter.sendMail(mailOptions, function (error, success) {
        if (error) {
            console.log(error)
        } else if (success) {
            console.log('Email send from nodemailer file')
        }
    })












    //    console.log('We are inside send mail function')
    //    var token = forgetPasswordToken;
    //    console.log("Token in the mailgun file : ",token)

    //    console.log('email in mail-js file : ',email)

    //     const data = {
    //         from: 'noreply@hello.com',
    //         to: email,
    //         subject: 'Email account activation link',
    //         html: `
    //                <h2>Please click on the given link for resetting the password</h2>
    //                <p><a>http://localhost:5000/api/resetPassword/${token}</a></p>`
    //     };

    //     mg.messages().send(data).then(success=>{
    //         console.log('Reset password link is send')

    //     }).catch(err=>{
    //         console.log(err)
    //     })


}
