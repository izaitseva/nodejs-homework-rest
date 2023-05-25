const User = require('../../models/user')
const RequestError = require('../../helpers/requestError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw RequestError(401, 'Email or password is wrong')
    }

    if (!user.verify) {
        throw RequestError(401, `Email wasn't verified`)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw RequestError(401, 'Email or password is wrong')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
    await User.findByIdAndUpdate(user._id, { token })

    res.json({ token })
}

module.exports = login