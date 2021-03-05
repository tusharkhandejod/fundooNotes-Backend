const express = require('express');
const router = express.Router();
const { Validator, ValidationResult } = require('../Middlewares/Validation')
const jwtToken = require('../Middlewares/jwtToken');
const logger = require('../Logger/logger')

const userController = require('../Controller/controller');
const noteController = require('../Controller/noteController');

logger.info(`Routes file is running`)



router.post('/user/register', Validator.register, ValidationResult, userController.register);
router.post('/user/login', Validator.login, ValidationResult, userController.login);
router.put('/user/forgetPassword', Validator.forgetPassword, ValidationResult, userController.forgetPassword);
router.put('/user/resetPassword', jwtToken.verifyToken, Validator.resetPassword, ValidationResult, userController.resetPassword);


router.post('/user/addNote', jwtToken.verifyToken, Validator.addNote, ValidationResult, noteController.addNoteController);
router.put('/user/deleteNote', jwtToken.verifyToken, Validator.deleteNote, ValidationResult, noteController.deleteNoteController);
router.get('/user/getAllNotes', jwtToken.verifyToken, noteController.getAllNotesController);
router.put('/user/updateNotes', jwtToken.verifyToken, Validator.updateNotes, ValidationResult, noteController.updateNotesController);

router.put('/user/moveToTrash', jwtToken.verifyToken, Validator.moveToTrash, ValidationResult, noteController.moveToTrashController);
router.get('/user/getAllTrashNotes', jwtToken.verifyToken, noteController.getAllTrashNotesController );

router.put('/user/moveToArchive', jwtToken.verifyToken, Validator.moveToArchive, ValidationResult, noteController.moveToArchiveController);
router.get('/user/getAllArchivedNotes', jwtToken.verifyToken, noteController.getAllArchivedNotesController );


module.exports = router;