const express = require('express')
const Joi = require('joi')
const contacts = require('../../models/contacts')
const RequestError = require('../../helpers')

const contactSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

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
      throw RequestError(404, 'Not Found')
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
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

  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router