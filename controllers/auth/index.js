const express = require('express')

const authRouter = express.Router()
const loginController = require('./loginController')
const signupController = require('./signupController')

authRouter.post('/auth/login', loginController)
authRouter.post('/auth/signup', signupController)

module.exports = authRouter
