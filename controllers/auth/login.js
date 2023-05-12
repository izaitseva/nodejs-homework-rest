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

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw RequestError(401, 'Email or password is wrong')
    }

    // const token = jwt.sign({ id: user._id }, JWT_SECRET)

    console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
    // console.log('secret-', token);

    res.json({ token })
}

module.exports = login