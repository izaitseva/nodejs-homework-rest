const { Schema, model } = require('mongoose')

const schema = new Schema({
    // id: String,
    name: String,
    email: String,
    phone: String
})

const Contact = model('contact', schema);

module.exports = Contact;