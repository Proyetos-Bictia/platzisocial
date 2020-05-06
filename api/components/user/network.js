const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', (req, res) => {
    controller.list().then(data => {
        response.success(req,res,data, 201)
    }).catch(e => {
        response.error(req,res,e.message, 500)
    })
})

router.get('/:id', (req, res) => {
    controller.get(req.params.id).then(data => {
        response.success(req,res,data, 201)
    }).catch(e => {
        response.error(req,res,e.message, 500)
    })
})

router.post('/', (req, res) => {
    controller.upsert(req.body).then(data => {
        response.success(req,res,data, 201)
    }).catch(e => {
        response.error(req,res,e.message, 500)
    })
})

router.delete('/:id', (req, res) => {
    controller.remove(req.params.id).then(data => {
        response.success(req,res,data, 201)
    }).catch(e => {
        response.error(req,res,e, 500)
    })
})

module.exports = router