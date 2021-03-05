const { check, validationResult } = require('express-validator');


exports.ValidationResult = (req, res, next) => {
 const result = validationResult(req);
 if(!result.isEmpty()){
    const error = result.array()[0].msg;
    return res.status(422).json({ success: false, error: error })
 }

 next();
}


exports.Validator = {
    register: [
        check('firstname')
            .trim()
            .not()
            .isEmpty()
            .withMessage('First name is required')
            .isLength({ min: 3, max: 20 })
            .withMessage('First name must contain atleast 3 characters'),
        check('lastname')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Last name is required')
            .isLength({ min: 3, max: 20 })
            .withMessage('Last name must contain atleast 3 characters'),
        check('email')
            .trim()
            .isEmail()
            .withMessage('PLease provide valid Email ID'),
        check('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Password is required')
            .isLength({ min:8, max: 20 })
            .withMessage('Password must contain atleast 8 characters')
    ],

    login: [
        check('email')
            .trim()
            .isEmail()
            .withMessage('PLease provide valid Email ID'),
        check('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Password is required')
            .isLength({ min:8, max: 20 })
            .withMessage('Password must contain atleast 8 characters')
    ],

    forgetPassword: [
        check('email')
            .trim()
            .isEmail()
            .withMessage('PLease provide valid Email ID')
    ],
    
    updateNotes: [
        check('title')
             .trim()
             .not()
             .isEmpty()
             .withMessage('title should not be empty'),
        check('description')
             .trim()
             .not()
             .isEmpty()
             .withMessage('description should not be empty')
    ],

    moveToTrash: [
        check('moveToTrashNote_ID')
              .trim()
              .not()
              .isEmpty()
              .withMessage('moveToTrashNote_ID should not be empty')
    ]

} 