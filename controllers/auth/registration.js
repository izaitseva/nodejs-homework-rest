const bcrypt = require('bcrypt')
const User = require('../../models/user')
const gravatar = require('gravatar');
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')
const { BASE_URL } = process.env

const registration = async (req, res) => {
    const { email, password } = req.body

    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid()

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        ...req.body,
        password: hashedPass,
        avatarURL,
        verificationToken
    })

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail)

    res.status(201).json({
        id: newUser.id,
        email: newUser.email,
    })
}

module.exports = registration
