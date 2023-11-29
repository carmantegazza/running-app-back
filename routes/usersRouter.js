const usersRouter = require('express').Router()
const validator = require('../config/validator')
const passport = require('../config/passport')
const usersControllers = require ('../controllers/userControllers')
const { PreSignIn,SignUp, SignIn , verifyMail, verificarToken,forgotPassword } = usersControllers

usersRouter.route('/users/auth/signup').post(validator,SignUp)
usersRouter.route('/users/auth/signin').post(SignIn)
usersRouter.route('/users/auth/verifyEmail/:string').get(verifyMail)
usersRouter.route('/users/auth/signInToken').get(passport.authenticate('jwt', {session: false}), verificarToken)
usersRouter.route('/users/auth/presignin').get(PreSignIn)
usersRouter.route('/users/auth/forgotpassword').get(forgotPassword)
module.exports = usersRouter


