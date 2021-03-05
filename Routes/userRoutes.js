const express = require('express');
const router = express.Router();
const { Validator, ValidationResult } = require('../Middlewares/Validation')
const jwtToken = require('../Middlewares/jwtToken');
const logger = require('../Logger/logger')

const userController = require('../Controller/controller');
const noteController = require('../Controller/noteController');
const { validationResult } = require('express-validator');

logger.info(`Routes file is running`)



router.post('/user/register', Validator.register, ValidationResult, userController.register);
router.post('/user/login', userController.login);
router.put('/user/forgetPassword', userController.forgetPassword);
router.put('/user/resetPassword', jwtToken.verifyToken, userController.resetPassword);


router.post('/user/addNote', jwtToken.verifyToken, noteController.addNoteController);
router.put('/user/deleteNote', jwtToken.verifyToken, noteController.deleteNoteController);
router.get('/user/getAllNotes', jwtToken.verifyToken, noteController.getAllNotesController);
router.put('/user/updateNotes', jwtToken.verifyToken, Validator.updateNotes, ValidationResult, noteController.updateNotesController);

router.put('/user/moveToTrash', jwtToken.verifyToken, Validator.moveToTrash, ValidationResult, noteController.moveToTrashController);
router.get('/user/getAllTrashNotes', jwtToken.verifyToken, noteController.getAllTrashNotesController )


module.exports = router;