const registration = require('./registration')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrent')
const updateAvatar = require('./updateAvatar')
const verifyEmail = require('./verifyEmail')
const resendEmail = require('./resendEmail')

module.exports = {
    registration,
    login,
    logout,
    getCurrent,
    resendEmail,
    updateAvatar,
    verifyEmail
}