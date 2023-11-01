const express = require('express')
const usersRouter = express.Router()

const validator = require('../config/validator')

const usersControllers = require ('../controllers/userControllers')
const { Verify } = require('crypto')
const { SignUp, SignIn , verifyMail } = usersControllers

usersRouter.route('/users/auth/signup').post(validator,SignUp)
usersRouter.route('/users/auth/signin').post(SignIn)

usersRouter.route('/users/auth/verifyEmail/:string').get(verifyMail)

module.exports = usersRouter


