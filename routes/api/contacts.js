const express = require('express')
const contacts = require('../../models/contacts')

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
    res.json(contact)
    next()
  } catch (error) {
    res.status(404).json({ message: error.message})
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
