const { RequestError } = require('../helpers')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization || ''

    const [type, token] = authHeader.split(' ')

    if (type !== "Bearer") {
        throw RequestError(401, 'Token type is not valid')
    }

    if (!token) {
        throw RequestError(401, 'No token provided')
    }

    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(id)
        req.user = user
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === 'JsonWebTokenError') {
            throw RequestError(401, 'JWT Token is not valid')
        }
    }
    next()
}

module.exports = auth