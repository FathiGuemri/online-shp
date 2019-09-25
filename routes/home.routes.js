const router = require('express').Router()

const HomeGonrollers = require('../controllers/home.controllers')

router.get('/', HomeGonrollers.getHome)

module.exports = router 