const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')

// 註冊api
router.post('/signUp', userController.signUp)

module.exports = router
