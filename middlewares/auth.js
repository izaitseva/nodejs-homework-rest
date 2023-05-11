const auth = (req, res, next) => {
    console.log('auth middle');
    next()
}

module.exports = auth