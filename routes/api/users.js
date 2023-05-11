const express = require('express')
const router = express.Router()
const controller = require('../../controllers/users')
const controllerWrapper = require('../../helpers/controllerWrapper')
// const auth = require('../../middlewares/auth')

router.post('', controllerWrapper(controller.addContact))
router.get('/contacts', controllerWrapper(controller.getContacts))
router.get('/info', controllerWrapper(controller.getInfo))

module.exports = router 