
const uptime = process.uptime()

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { json, urlencoded } = require('body-parser')
const helmet = require('helmet')
const app = express()
const { handleException } = require('./helper')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(helmet())

app.get('/status', async (req, res) => {
    try {
        res.status(200).json({
            message: 'ok',
            status: 'on',
            uptime
        })
    } catch (error) {
        handleException(res, 503, error.message)
    }
});

app.get('/', async (req, res) => {
    try {
        res.status(200).json({});
    } catch (error) {
        handleException(res, 503, error.message)
    }
})

app.get('*', async (req, res) => {
    try {
        res.status(404).send({ message: 'Endpoint not available' })
    } catch (error) {
        handleException(res, 503, error.message)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});