const getInfo = (req, res) => {
    const { user } = req
    const { email, contacts } = user
    res.json({ email, contacts })
}

module.exports = getInfo