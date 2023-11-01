const express = require('express')
const usersRouter = express.Router()

const validator = require('../config/validator')

const usersControllers = require ('../controllers/userControllers')
const { SignUp, SignIn } = usersControllers

usersRouter.route('/users/auth/signup').post(validator,SignUp)
usersRouter.route('/users/auth/signin').post(SignIn)

module.exports = usersRouter


