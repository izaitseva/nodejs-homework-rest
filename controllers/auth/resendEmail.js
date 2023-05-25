const Joi = require('joi')
const { RequestError, sendEmail } = require('../../helpers');
const User = require('../../models/user')
const { BASE_URL } = process.env

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required(),
})

const resendEmail = async (req, res) => {

    const { error } = emailSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(401, "email not found")
    }

    if(user.verify) {
        throw RequestError(401, "Email is already verified")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail)

    res.json({
        message: "Verify email send success"
    })
}

module.exports = resendEmail