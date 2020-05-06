const express = require('express')
const parser = require('body-parser')

const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')

const app = express()

//Router
app.use(parser.json())
app.use('/api/user', user)
app.use('/api/auth', auth)

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
})