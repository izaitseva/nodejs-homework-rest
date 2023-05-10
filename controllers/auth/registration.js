const User = require('../../models/user')
// const {RequestError} = require('../../helpers')

const registration = async (req, res) => {
    const result = await User.create(req.body)
    res.status(201).json(result)
}

module.exports = registration