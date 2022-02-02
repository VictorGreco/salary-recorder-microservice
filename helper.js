const handleException = (res, status, message) => {

    res.status(status).send({ message });
}

module.exports = {
    handleException
}