const RequestError = (status, message) => {
    const error = new Error('Not Found')
    error.status = 404
    throw error
}

module.exports = RequestError