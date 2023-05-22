const bcrypt = require('bcrypt')
const User = require('../../models/user')
const gravatar = require('gravatar');


const registration = async (req, res) => {
    const { email, password } = req.body

    const avatarURL = gravatar.url(email)

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt)

    const result = await User.create({
        email,
        password: hashedPass,
        avatarURL
    })
    res.status(201).json({
        id: result.id,
        email,
    })
}

module.exports = registration
