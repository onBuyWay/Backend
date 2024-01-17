const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')

// 註冊api
router.post('/signUp', userController.signUp)
// glabal error handler
router.use('/', apiErrorHandler)

module.exports = router
