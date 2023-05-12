const { RequestError } = require('../helpers')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    console.log("----- > AUTH MIDDLEWARE")
    const authHeader = req.headers.authorization || ''

    const [type, token] = authHeader.split(' ')

    if (type !== "Bearer") {
        throw RequestError(401, 'Token type is not valid')
    }

    if (!token) {
        throw RequestError(401, 'No token provided')
    }

    try {
        console.log("Token: ", token);
        console.log("JWT_SECRET", process.env.JWT_SECRET);
        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(id)
        req.user = user
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === 'JsonWebTokenError') {
            throw RequestError(401, 'JWT Token is not valid')
        }
    }

    console.log("----- > END AUTH MIDDLEWARE")
    next()
}

module.exports = auth