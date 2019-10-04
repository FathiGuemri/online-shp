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

router.post('/save', authGuard.isAuth, bodyParser.urlencoded({extended: true}),
            check('amount').not().isEmpty().withMessage('amount is required')
            .isInt({min: 1}).withMessage('amount must be gerter then 0'),
            cartControlles.postSave
            )
router.post('/delete', 
    authGuard.isAuth, bodyParser.urlencoded({extended: true}),
    cartControlles.postDelete
)
router.post('/delete-all',
    authGuard.isAuth, bodyParser.urlencoded({extended: true}),
    cartControlles.postDeletAllCart
)
router.post('/order', bodyParser.urlencoded({extended: true}), 
    require('../controllers/order.controlles').postToOrderAddress
)
module.exports = router