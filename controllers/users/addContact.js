const User = require('../../models/user');

const addContacts = async (req, res) => {
    const { user } = req
    const { id: contactId } = req.body

    user.contacts.push(contactId)
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
        new: true,
    })

    res.json({ contacts: updatedUser.contacts })
}

module.exports = addContacts 