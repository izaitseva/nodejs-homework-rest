const express = require('express')
const router = express.Router()
const controller = require('../../controllers/controller')
const authentification = require('../../controllers/users')

router.post('/', controller.controllerWrapper(authentification.addContact))
router.get('/contacts', controller.controllerWrapper(authentification.getContacts))
router.get('/info', controller.controllerWrapper(authentification.getInfo))

module.exports = router 