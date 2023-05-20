const express = require('express')
const Joi = require('joi')
const { RequestError } = require('../../helpers')
const Contact = require('../../models/contact')
const controllerWrapper = require('../../helpers/controllerWrapper')
const auth = require('../../middlewares/auth')
const { upload } = require('../../middlewares')
const path = require('path')
const fs = require('fs/promises')

const contactCreateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const contactUpdateSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean()
});

const router = express.Router()

router.get('', controllerWrapper(auth), async (req, res, next) => {

  try {
    const { _id: owner } = req.user;

    const { page, limit } = req.query
    const skip = (page - 1) * limit

    const allContacts = await Contact.find({ owner }, '-__v').skip(skip).limit(limit);
    res.json(allContacts)
    next()
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', controllerWrapper(auth), async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params
    const contact = await Contact.findOne({ _id: contactId, owner })
    if (!contact) {
      throw RequestError(404, 'Not Found')
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('', controllerWrapper(auth), async (req, res, next) => {
  try {
    const { error } = contactCreateSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const { id: owner } = req.user
    const result = await Contact.create({ ...req.body, owner })
    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', controllerWrapper(auth), async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params
    const result = await Contact.findOneAndDelete({ _id: contactId, owner })
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json({ "message": "contact deleted" })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', controllerWrapper(auth), async (req, res, next) => {

  try {
    const { _id: owner } = req.user;
    const { error } = contactUpdateSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true })
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', controllerWrapper(auth), async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body)
    if (error) {
      throw RequestError(400, "missing field favorite")
    }
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true })
    if (!result) {
      throw RequestError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }

  const contactsDir = path.join(__dirname, "..", "..", "public", "avatars")
  router.post('', upload.single('avatar'), async (req, res, next) => {
    try {
      console.log(contactsDir);

      const { error } = contactCreateSchema.validate(req.body);
      if (error) {
        throw RequestError(400, error.message);
      }

      let avatar = null;
      if (req.file) {
        const { path: tmpUpload, originalname } = req.file;
        const resultUpload = path.join(contactsDir, originalname);
        await fs.rename(tmpUpload, resultUpload);
        avatar = path.join("public", "avatars", originalname);
      }

      const newContact = {
        ...req.body,
        avatar
      };

      const result = await Contact.create(newContact);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  });

})

module.exports = router