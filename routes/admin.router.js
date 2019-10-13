const router = require('express').Router()

const check = require('express-validator').check

const multer = require('multer')
const bodyParser = require('body-parser')

const adminConroller = require('../controllers/admin.controller')
const adminGuard = require('./gaurds/admin.guard')

router.get('/add', adminGuard, adminConroller.getAdd)

router.post('/add', adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }) 
}).single('image'),
check('image').custom((value, {req}) => {
    if (req.file) return true
    else throw 'image Is required'
}), 
check('name').not().isEmpty().withMessage('Product Name Is required'),
check('price').not().isEmpty().withMessage('Product price Is required'),
check('description').not().isEmpty().withMessage('Product description Is required'),
check('category').not().isEmpty().withMessage('Product category Is required'),
adminConroller.postAdd)

router.get('/orders',adminGuard, adminConroller.getMOrders)
router.get('/orders/:fullter',adminGuard, adminConroller.getMOrdersFullter)


router.post('/orders/save',adminGuard, 
 bodyParser.urlencoded({extended: true}),
adminConroller.postEditOrder)




module.exports = router