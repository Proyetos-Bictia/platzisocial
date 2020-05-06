const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.post('/login', (req,res) => {
    controller.login(req.body.username, req.body.password).then(data => {
        response.success(req,res,data,200)
    }).catch(e => {
        response.error(req,res,e.message, 400)
    })
})

module.exports = router