const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const services = require('../Services/userServices');
const { response } = require('express');
const logger = require('../Logger/logger');

const register = (req, res, next) => {
    
    logger.info(`controller register function is running`)
    services.register(req).then((result) => {
        logger.info(`controller register then : `,result)
        response.success = true;
        response.message = result.message;
        response.data = result.data;
        return res.status(200).send(response);
    }).catch((error) => {
        logger.error(`controller register catch : `,error)
        response.success = false;
        response.message = error.message;
        response.data = error.error;
        return res.status(400).send(response);
    })



}

const login = (req, res, next) => {

    logger.info(`controller login function is running`)
    services.login(req, (err, data) => {
        if (err) {
            logger.error(`inside the controller login data`,err)
            response.success = true;
            response.error = err;
            return res.status(400).send(response);
        } else if (data) {
            logger.error(`inside the controller login err`,data)
            response.success = false;
            response.result = data;
            return res.status(200).send(response);
        }
    })

}

const forgetPassword = (req, res) => {

    logger.info(`controller forgetPassword function is running`)
    services.forgetPassword(req)
        .then(result => {
            response.success = result.flag;
            response.message = result.message;
            response.data = result.data;
            return res.status(200).send(response);
        }).catch(error => {
            response.success = false;
            response.message = error.message;
            response.data = error.error;
            return res.status(400).send(response);
        })


}

const resetPassword = (req,res,next) => {


  logger.info(`controller forgetPassword function is running`)
   return services.resetPassword(req).then(result => {
        response.success = true;
        response.message = result.message;
        response.data = result.data;
        return res.status(200).send(response);
    }).catch(error => {
        response.success = false;
        response.message = error.message;
        response.data = error.error;
        return res.status(400).send(response)
    })



}

module.exports = {
    register, login, forgetPassword, resetPassword
}