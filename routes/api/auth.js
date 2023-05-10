const express = require('express')
const router = express.Router()
const controller = require('../../controllers/controller')
const auth = require('../../controllers/auth')

router.post('/users/register', controller.controllerWrapper(auth.registration))
router.post('/users/login', controller.controllerWrapper(auth.login))

module.exports = router 