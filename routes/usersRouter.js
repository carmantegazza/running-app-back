const usersRouter = require('express').Router()
const validator = require('../config/validator')
const passport = require('../config/passport')
const usersControllers = require ('../controllers/userControllers')
const { deleteDocument,changeUserEmail, sendEmail, PreSignIn,SignUp, SignIn , verifyMail, verificarToken,forgotPassword,displayChangePasswordForm,changePassword } = usersControllers

usersRouter.route('/users/auth/signup').post(validator,SignUp)
usersRouter.route('/users/auth/sendemail').post(sendEmail)
usersRouter.route('/users/auth/deletedocument').delete(deleteDocument)
//usersRouter.route('/users/auth/changeusermail').post(changeUserEmail)
usersRouter.route('/users/auth/signin').post(SignIn)
usersRouter.route('/users/auth/verifyEmail/:string').get(verifyMail)
usersRouter.route('/users/auth/signInToken').get(passport.authenticate('jwt', {session: false}), verificarToken)
usersRouter.route('/users/auth/presignin').get(PreSignIn)
usersRouter.route('/users/auth/forgotpassword').get(forgotPassword)
usersRouter.route('/users/auth/forgotpassword/:string').get(displayChangePasswordForm)
usersRouter.route('/users/auth/changePassword').post(changePassword)

usersRouter.put('/users/:id', usersControllers.updateFavEvent)
usersRouter.get('/user/:id', usersControllers.getUser)

// usersRouter.put('/updateusers/:id', usersControllers.updateUser);

module.exports = usersRouter


