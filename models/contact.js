const { Schema, model } = require('mongoose')

// owner: {
//     type: Schema.Types.ObjectId,
//     ref: 'user',
//   }

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
    }
    , { versionKey: false })

const Contact = model('contact', schema);

module.exports = Contact;