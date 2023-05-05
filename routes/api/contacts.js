const express = require('express')
const Joi = require('joi')
// const contacts = require('../../models/contacts')
const RequestError = require('../../helpers')
const Contact = require('../../models/contact')

const contactCreateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required()
});

const contactUpdateSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean()
});

const router = express.Router()

router.get('', async (req, res, next) => {

  try {
    const allContacts = await Contact.find({}, '-__v');
    res.json(allContacts)
    next()
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
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
    console.log(req.body);
    const { error } = contactCreateSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const result = await Contact.create(req.body)
    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json({ "message": "contact deleted" })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {

  try {
    const { error } = contactUpdateSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router