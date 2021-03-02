
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcryptCheck = require('../Middlewares/bcryptfile');
const jwtToken = require('../Middlewares/jwtToken');
const { sendMail } = require('../Middlewares/mail-gun');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetLink: {
        data: String,
        default: ''
    }
},
    { timestamps: true })

let User = mongoose.model('User', userSchema)
module.exports = User


class EmpModel {

    register = (req, res, next) => {

        var simplePass = req.body.password
        var hashpass = bcryptCheck.encodePassword(simplePass)
        console.log("Hashass : ", hashpass)
        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashpass
        }

        return User.create(user).then(result => {
            return result;

        }).catch(error => {
            return error;

        })

    }



    login = (loginData, callback) => {

       
        User.findOne({ 'email': loginData.email }, (err, user) => {

            if (err) {
                console.log(err)
                callback(err)
            } else {
                if(!user){
                    console.log('Email ID not exists')
                    return callback("Email ID not exists")
                }
                if (user) {
                    console.log('Found record : ', user)
                    let payload = {
                        "email": user.email,
                        "id": user._id
                    }
                    
                    bcryptCheck.VerifyPassword(loginData.password, user.password).then(data => {
                        console.log('passCompareResult : ',data)

                        console.log('Payload : ', payload)
                        if (data === true) {
                            console.log('Login Successfull')
                            let loginToken = jwtToken.generateToken(payload);
                            console.log('Login Token : ', loginToken)
                            return callback(null,{ message: "Login Successfull", "token": loginToken })
                        }else {
                            console.log('Login failed')
                            return callback("Password did not matched")
                        }

                    }).catch(err => {
                        console.log(err)
                    })

                } else {
                    console.log('Record not found : ', data)
                }
            }
        })




    }

    forgetPassword = (req) => {
        

        User.findOne({'email': req.body.email}).then(user=>{
            console.log('Record check : ',user)
            if(!user){
                console.log('User not found')
                return ({ message: "User not found" })
            }else if(user){
               console.log('Record found : ',user)
               let payload = {
                "email": user.email,
                "id": user._id
               }
               let forgetPasswordToken = jwtToken.generateToken(payload)
               console.log('Forget password token : ', forgetPasswordToken)

               return User.updateOne({ resetLink: forgetPasswordToken.token }).then(success=>{
                console.log(success)
                sendMail(forgetPasswordToken.token, user.email);
                return ({ message: "Reset password link is send on your Email kindly check", data: success })

               }).catch(err=>{
                   return ({ error: "Reset password link error", data:err })
               })
            }
        }).catch(err=>{
            console.log(err)
        })
       
       
        // User.findOne({ email }, (err, user) => {
        //     if (err || !user) {
        //         return error = "User does not exists"
        //     }

        //     let payload2 = {
        //         "email": user.email
        //     }

        //     let forgetPasswordToken = jwtToken.generateToken(payload2);
        //     console.log("forget password token : ", forgetPasswordToken.token)


        //     return user.updateOne({ resetLink: forgetPasswordToken.token }, function (err, success) {
        //         if (err) {
        //             return error = "Reset password link error";
        //         } else {
        //             sendMail(forgetPasswordToken.token, user.email);
        //         }
        //     })
        // })
    }

    resetPassword = (req, res) => {
        const { resetLink, newPass } = req.body;
        console.log('reset link : ', resetLink)
        console.log('new Password : ', newPass)

        if (resetLink) {

            let checkTokenVerifyResult = jwtToken.TokenVerification(resetLink);
        }
    }
}





module.exports = new EmpModel();