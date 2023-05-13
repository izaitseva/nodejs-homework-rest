const express = require('express')
const router = express.Router()
const controller = require('../../controllers/users')
const controllerWrapper = require('../../helpers/controllerWrapper')
const auth = require('../../middlewares/auth')

router.get('/info', controllerWrapper(auth), controllerWrapper(controller.getInfo))

module.exports = router 