const express = require('express');
const router = express.Router();
const { Validator, ValidationResult } = require('../Middlewares/Validation')

const userController = require('../Controller/controller');
const { validationResult } = require('express-validator');

router.post('/user/register', Validator.register, ValidationResult, userController.register);
router.post('/user/login', userController.login);
router.put('/user/forgetPassword', userController.forgetPassword);
router.put('/user/resetPassword', userController.resetPassword);

module.exports = router;