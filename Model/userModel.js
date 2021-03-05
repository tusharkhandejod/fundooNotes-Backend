
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { callbackPromise } = require('nodemailer/lib/shared');
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
                        if (data === true) {
                            console.log('Login Successfull')
                            let loginToken = jwtToken.generateToken(payload);
                            console.log('Login Token : ', loginToken)
                            return callback({ "message": "Login Successfull", "token": loginToken })
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
        

     return new Promise((resolve,reject)=>{
        User.findOne({'email': req.body.email}).then(user=>{
           
            if(!user){
                console.log('User not found')
                reject ({err:"user not found", success: false });
            }else if(user){
              
               let payload = {
                "email": user.email,
                "id": user._id
               }
               let forgetPasswordToken = jwtToken.generateToken(payload)
               var URL = `${process.env.baseURL}/resetPassword/${forgetPasswordToken.token}`;
               
                return User.updateOne({ resetLink: forgetPasswordToken.token }).then(success=>{
                   sendMail(forgetPasswordToken.token, user.email, URL);
                   resolve(user)
                   
                }).catch(err=>{
                    console.log(err)
                    reject ({err:"Token not mached", success: false });
                    
               })
            }
        }).catch(err=>{
            console.log(err)
            reject(err)
            return err;
        })
     })
        
       
       
       
    }

    resetPassword = (resetPasswordData, callback) => {
        
        return User.findByIdAndUpdate(resetPasswordData.id,resetPasswordData, (err, success)=>{
            if(err){
                console.log(err)
                console.log('Error Password not changed')
                return callback(err)
            }else if(success){
                console.log('Your password has been changed')
                return callback({ "message": "Your password has been changed" })
            }else {
                return callback({ "message": "Error Password not changed" })
            }
        })
        
    }
}


module.exports = new EmpModel();