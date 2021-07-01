const express = require('express')

const authRouter = express.Router()
const loginController = require('./loginController')

authRouter.post('/auth/login', loginController)

module.exports = authRouter
