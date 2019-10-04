const router = require('express').Router()
const bodyParser = require('body-parser')


const orderController = require('../controllers/order.controlles')


router.post('/address', bodyParser.urlencoded({extended: true}), orderController.postOrder )

router.get('/', orderController.getOrders)

router.post('/cancel',  bodyParser.urlencoded({extended: true}), orderController.postCansel)
router.post('/cancel-all',  bodyParser.urlencoded({extended: true}), orderController.postCanselAll)

module.exports = router