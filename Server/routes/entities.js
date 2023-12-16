const express = require('express')
const { getEntity } = require('../controllers/entitiesController')
const router = express.Router()

router.get('/getEntity', getEntity)

module.exports = router