const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authController =  require('../controllers/auth.controllers')
const authGuard = require('./gaurds/auth.gaurd')


router.get('/singup', authGuard.notAuth, authController.getSingup )

router.post('/singup',

    bodyParser.urlencoded({extended: true}),
    check('username').not().isEmpty().withMessage('username is required'),
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('invaled format email'),
    check('password').not().isEmpty().withMessage('password is required').isLength({min: 6}).withMessage('At least 8 characters and 1 digit'),
    check('confermPassword').custom((value, {req}) => {
        if (value === req.body.password) return true;
        else  throw 'password dont equal'
    }),
    authGuard.notAuth,
    authController.postSingup
);

router.get('/login', authGuard.notAuth, authController.getLogin )

router.post('/login', 
    bodyParser.urlencoded({extended: true}),
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('invaled format email'),
    check('password').not().isEmpty().withMessage('password is required').isLength({min: 6}).withMessage('At least 8 characters and 1 digit'),
    authGuard.notAuth,
    authController.postLogin 
)

router.all('/logout', authGuard.notAuth, authController.logout)

module.exports = router