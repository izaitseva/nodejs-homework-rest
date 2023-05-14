const express = require('express')
const router = express.Router()
const controller = require('../../controllers/auth')
const auth = require('../../middlewares/auth')
const controllerWrapper = require('../../helpers/controllerWrapper')

router.post('/register', controllerWrapper(controller.registration))
router.post('/login', controllerWrapper(controller.login))
router.get('/current', controllerWrapper(auth), controller.getCurrent)
router.post('/logout', controllerWrapper(auth), controllerWrapper(controller.logout))

module.exports = router 