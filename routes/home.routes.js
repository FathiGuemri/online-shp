const router = require('express').Router()

const authGaurd = require('./gaurds/auth.gaurd')

const Homeconrollers = require('../controllers/home.controllers')

router.get('/', Homeconrollers.getHome)

module.exports = router 