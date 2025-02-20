const { Schema, model } = require('mongoose')


const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    }
    , { versionKey: false })

const Contact = model('contact', schema);

module.exports = Contact;