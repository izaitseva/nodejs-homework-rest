const getInfo = (req, res) => {
    const { user } = req
    const { email } = user
    res.json({ email })
}

module.exports = getInfo