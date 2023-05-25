const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY)

const sendEmail = async (data) => {
    const email = { ...data, from: "zaitseva02@gmail.com" }
    await sgMail.send(email)
}

const email = {
    to: "tejaka3273@mevori.com",
    from: "zaitseva02@gmail.com",
    subject: "Test email",
    html: "<p>Добридень<p>"
}

sgMail.send(email)
    .then(() => {
        console.log("success");
    })
    .catch(error => console.log(error.message))

module.exports = sendEmail