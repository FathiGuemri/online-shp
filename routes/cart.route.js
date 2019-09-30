const router = require('express').Router()
const check = require('express-validator').check
const bodyParser = require('body-parser')

const authGuard = require('./gaurds/auth.gaurd')

const cartControlles = require('../controllers/cart.controlers')

router.get('/', authGuard.isAuth, cartControlles.getCart)


router.post('/', authGuard.isAuth, bodyParser.urlencoded({extended: true}),
    check('amount').not().isEmpty().withMessage('amount is required')
    .isInt({min: 1}).withMessage('amount must be gerter then 0'),
    cartControlles.postCart
)

module.exports = router