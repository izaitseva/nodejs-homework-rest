const User = require('../../models/user')
// const {RequestError} = require('../../helpers')

const registration = async (req, res) => {
    // try {
        const result = await User.create(req.body)
        res.status(201).json(result)
    // } catch (error) {
    //     // if(error.message.includes('E11000 dublicate key error')) {
    //     //     throw RequestError(409, 'Email in use')
    //     // }
    // }  

}

module.exports = registration