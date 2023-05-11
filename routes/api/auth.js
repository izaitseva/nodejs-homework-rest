const express = require('express')
const router = express.Router()
const controller = require('../../controllers/auth')
const controllerWrapper = require('../../helpers/controllerWrapper')

router.post('/register', controllerWrapper(controller.registration))
router.post('/login', controllerWrapper(controller.login))

module.exports = router 