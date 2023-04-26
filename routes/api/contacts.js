const express = require('express')
const contacts = require('../../models/contacts')
const requestError = require('../../helpers')
const router = express.Router()

router.get('', async (req, res, next) => {

  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts)
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contacts.getContactById(contactId)

    if (!contact) {
      throw requestError(404, 'Not Found')
    }
    res.json(contact)
    next()
  } catch (error) {
    const { status = 500, message = "Server error" } = error
    res.status(status).json({ message })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
