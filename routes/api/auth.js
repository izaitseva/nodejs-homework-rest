const express = require('express')
const router = express.Router()
const controller = require('../../controllers/auth')
const auth = require('../../middlewares/auth')
const upload = require('../../middlewares/upload')
const controllerWrapper = require('../../helpers/controllerWrapper')

router.post('/register', controllerWrapper(controller.registration))
router.post('/login', controllerWrapper(controller.login))
router.get('/current', controllerWrapper(auth), controller.getCurrent)
router.post('/logout', controllerWrapper(auth), controllerWrapper(controller.logout))
router.patch('/avatars', controllerWrapper(auth), upload.single("avatar"), controllerWrapper(controller.updateAvatar))

module.exports = router 