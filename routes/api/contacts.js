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
    next(error)
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
  } catch (error) {
    next(error)
  }
})

router.post('', async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body)
    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router