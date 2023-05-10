const User = require('../../models/user')
const RequestError = require('../../helpers/requestError')
const bcrypt = require('bcrypt')

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

    res.json({ token: "<token>" })
}

module.exports = login