const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const services = require('../Services/userServices');
const { response } = require('express');

const register = (req, res, next) => {
    console.log(req)
    services.register(req).then((result) => {
        response.success = true;
        response.message = result.message;
        response.data = result.data;
        return res.status(200).send(response);
    }).catch((error) => {
        response.success = false;
        response.message = error.message;
        response.data = error.error;
        return res.status(400).send(response);
    })



}

const login = (req, res, next) => {


        services.login(req, (err, data)=>{
            if(err){
             response.success = false;
             response.error = err;
             return res.status(400).send(response);
            }else if(data) {
                response.success = true;
                response.result = data;
                return res.status(200).send(response);   
            }
        })

   
    // services.login(req.body, (err, result) => {
    //     if (result) {
    //         response.success = true;
    //         response.message = result.message;
    //         response.result = data;
    //         return res.status(200).send(response);
    //     } else if (err) {
    //         response.success = false;
    //         response.message = err.message;
    //         response.error = err;
    //         return res.status(400).send(response);
    //     }
    // })

}

const forgetPassword = (req) => {
       
       services.forgetPassword(req)
    // services.forgetPassword(req).then((result)=>{
    //     response.success = true;
    //     response.message = result.message;
    //     response.data = result.data;
    //     return res.status(200).send(response);
    //    }).catch((error) => {
    //     response.success = false;
    //     response.message = error.message;
    //     response.data = error.error;
    //     return res.status(400).send(response);
    //})
} 

const resetPassword = (req) => {
    services.resetPassword(req).then((result)=>{
     response.success = true;
     response.message = result.message;
     response.data = result.data;
     return res.status(200).send(response);
    }).catch((error) => {
     response.success = false;
     response.message = error.message;
     response.data = error.error;
     return res.status(400).send(response);
 })

} 

module.exports = {
    register, login, forgetPassword, resetPassword
}