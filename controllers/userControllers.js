const bcryptjs = require('bcryptjs')
const Users = require('../models/userModel')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const {google} = require('googleapis') 
const OAuth2 = google.auth.OAuth2

const sendMail = async (email, uniqueString)=>{

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_SECRET,
        "https://developers.google.com/oauthplayground"
    )

    myOAuth2Client.setCredentials({refresh_token:process.env.GOOGLE_REFRESHTOKEN})
    const accessToken = myOAuth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth:{
            user:"d13g0d3v@gmail.com",
            type: "OAuth2",
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret:process.env.GOOGLE_SECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls:{
            rejectUnauthorized: false
        } 
    })

    const mailOptions = {
        from: "d13g0d3v@gmail.com",
        to: email,
        subject: "Email Verification Link",
        html: `
        <div>
        <h1>Welcome to training-app</h1>
        <h3>Thank you for registering with us</h3>
        <p></p>
        <h2> Please click on the <a href=http://localhost:4000/api/users/auth/verifyEmail/${uniqueString}>following link</a> to verify your account </h2>
        </div>
        `
    }

    transporter.sendMail(mailOptions, function(error, response){
        if(error){console.log(error)}
        else{console.log("message sent")}
    })
}

const userControllers = {

    SignUp: async (req, res) => {

        const { fullName, email, password, from, aplication } = req.body.userData
        const contraseñaHash = bcryptjs.hashSync(password, 10)
        const emailVerify = false
        const uniqueString = crypto.randomBytes(15).toString('hex')
        try {
            const userExist = await Users.findOne({ email })

            if (userExist) {
                if (userExist.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from: from,
                        message: "You have already signed up through " + from + " please sign in"
                    })
                }
                else {
                    userExist.from.push(from)
                    userExist.password.push(contraseñaHash)

                    if(from !== "signUp-form"){
                       userExist.emailVerify = true 
                    }
                    
                    await userExist.save()

                    res.json({
                        success: true,
                        from: from,
                        message: "Added " + from + " to your methods to perform sign in"
                    })
                }
            }
            else {
                const nuevoUsuario = new Users({
                    fullName,
                    email,
                    password: [contraseñaHash],
                    from: [from],
                    aplication,
                    emailVerify,
                    uniqueString
                })

                if (from === "signUp-form") {

                    await nuevoUsuario.save()
                    // funcion que envia el mail de verificacion
                    sendMail(email, uniqueString)
                    
                    res.json({
                        success: true,
                        from: from,
                        message: " Please you must validate your email, we have sent you an email to " + email + " for you to do it"
                    })
                }
                else {
                    nuevoUsuario.emailVerify = true
                    await nuevoUsuario.save()

                    res.json({
                        success: true,
                        from: from,
                        message: " Congratulations, we created your user and added " + from + " to your methods to sign in"
                    })
                }
            }
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something has gone wrong, please try again in a few minutes"  })
        }
    },

    SignIn: async (req, res) => {
        const { email, password, from } = req.body.userData

        try {
            const usuario = await Users.findOne({ email })

            if (!usuario) {
                res.json({
                    success: false,
                    from: from,
                    message: "You had not signed Up with this email, please do so before signing in"
                })
            } else {
                const contraseñaCoincide = usuario.password.filter(pass => bcryptjs.compareSync(password, pass))
                const dataUser = {
                    id: usuario._id,
                    fullName: usuario.fullName,
                    email: usuario.email,
                    from: from
                }

                if (from !== 'signUp-form') {

                    if (contraseñaCoincide.length > 0) {

                        res.json({
                            success: true,
                            from,
                            response: { dataUser },
                            message: "Welcome " + dataUser.fullName + " we are happy to see you back !!! " 
                        })

                    } else {
                        const contraseñaHash = bcryptjs.hashSync(password, 10)
                        usuario.from.push(from)
                        usuario.password.push(contraseñaHash)
                        await usuario.save()

                        res.json({
                            success: true,
                            from,
                            response: { dataUser },
                            message: "We didn't have " + from + " in your methods to perform Sign In, but don't worry, we've added it!!!"
                        })
                    }
                } else {

                    if (contraseñaCoincide.length > 0) {
                        res.json({
                            success: true,
                            from,
                            response: { dataUser },
                            message: "Welcome " + dataUser.fullName + " we are happy to see you back !!! " 
                        })

                    } else {

                        res.json({
                            success: false,
                            from,
                            message: "We are sorry but the username or password do not match"
                        })
                    }
                }
            }

        } catch (err) {
            res.jsonj({
                success: false,
                from: from,
                message: "Oops something went wrong, try again in a few minutes",
                response: err
            })
        }
    }
}

module.exports = userControllers