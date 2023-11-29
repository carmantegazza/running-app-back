const bcryptjs = require('bcryptjs')
const Users = require('../models/userModel')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const {google} = require('googleapis') 
const OAuth2 = google.auth.OAuth2
const jwt = require('jsonwebtoken')

const sendMail = async (type,email, uniqueString,emailSubject)=>{

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_SECRET,
        "https://developers.google.com/oauthplayground"
    )

    myOAuth2Client.setCredentials({
        refresh_token:process.env.GOOGLE_REFRESHTOKEN
    })
    
    const accessToken = myOAuth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth:{
            user:"aprosgonzalo@gmail.com",
            type: "OAuth2",
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret:process.env.GOOGLE_SECRET,
            // refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            refreshToken: process.env.GOOGLE_REFRESHTOKE,
            accessToken: accessToken
        },
        tls:{
            rejectUnauthorized: false
        } 
    })

    // const body = ()=>{
    //     let response;
    //     switch(type){
            
    //         case 'verifyEmail':
    //             response = 
    //                 `<div>
                    
    //                 <h1>Welcome to training-app</h1>
    //                 <h3>Thank you for registering with us</h3>
    //                 <p></p>
    //                 <h2> Please click on the <a href=http://localhost:4000/api/users/auth/${type}/${uniqueString}>following link</a> to verify your account </h2>
                    
    //                 </div>`
    //         return response;
            
    //         case 'forgotpassword':
    //             response = 
    //             `<div>
                
    //             <h1>Password Recovery</h1>
    //             <p></p>
    //             <h2> <a href=http://localhost:4000/api/users/auth/${type}/${uniqueString}>Reset Password</a></h2>
    //             <p> If you didn't asked for a reset, just ignore this email</p>       
    //             </div>`
    //         return response;       
        
    //     }
        
    // } 
    const mailOptions = {
        from: "Training App",
        to: email,
        subject:emailSubject,
        html: `<div>
                    
        //                 <h1>Welcome to training-app</h1>
        //                 <h3>Thank you for registering with us</h3>
        //                 <p></p>
        //                 <h2> Please click on the <a href=http://localhost:4000/api/users/auth/${type}/${uniqueString}>following link</a> to verify your account </h2>
                        
        //                 </div>` 
    }
    
    
    
    
    // await transporter.sendMail(mailOptions, function(error, response){
    //     let transporterMail
    //     if(error){

    //         console.log('Mensaje no enviado')
            
    //         transporterMail = error

    //     }else{

    //         console.log('Mensaje enviado')
    //         transporterMail = response    
    //     }
    //     //transporterMail = response
    //     return transporterMail
    // })
    //.then(res => console.log(res))
    
    let response = await transporter.sendMail(mailOptions)
    .then(res => {
        return {
            res,
            success:true
        }
    })
    .catch(err => {
        return {
            err,
            success:false
        }
    })
    
    return response
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
                        message: "Added " + from + " to your sign in methods"
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

                    const subject =  "Email Verification Link"
                    
                    let mail = await sendMail('verifyEmail',email, uniqueString,subject)
                    console.log('this is mail success' + mail.success)

                    if(mail.success){
                        res.json({
                        success: true,
                        from: from,
                        message: " We have sent you an email to " + email + " for validating your account",
                        })
                    }else{
                        console.log('as email.success is false, were here')
                       
                        res.json({
                            success: false,
                            from: from,
                            message: 'There was a problem while sending validation to ' + email + ' please, try again or correct your email',
                        })
                    }
                    
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
    PreSignIn: async (req,res) => {
        const {email,from,aplication} = req.query

         try{
             const usuario = await Users.findOne({email})
            if(usuario){
                 res.json({
                     success:true,
                     from: from,
                     message:'User found'
                 })
             }else(
                 res.json({
                     success:false,
                     from: from,
                     message:'User not found'
                 })
             )
            
         }catch (error) {
            console.error('Error during PreSignIn:', error);
            res.status(500).json({
                success: false,
                from: from,
                message: 'Internal Server Error'
            });}
    },
    SignIn: async (req, res) => {
        const { email, password, from, aplication } = req.body.userData

        try {
            const usuario = await Users.findOne({ email })

            if (!usuario) {
                res.json({
                    success: false,
                    from: from,
                    message: "Please, sign up before logging in"
                })
            } else {
                const contraseñaCoincide = usuario.password.filter(pass => bcryptjs.compareSync(password, pass))
                const dataUser = {
                    id: usuario._id,
                    fullName: usuario.fullName,
                    email: usuario.email,
                    from: from,
                    aplication
                }

                if (from !== 'signUp-form') {

                    if (contraseñaCoincide.length > 0) {
                        // JWT
                        const token = jwt.sign({...dataUser}, process.env.SECRET_TOKEN, {expiresIn: '1h'})

                        res.json({
                            success: true,
                            from,
                            response: { token , dataUser },
                            message: "Welcome " + dataUser.fullName + ", happy to see you back! " 
                        })

                    } else {
                        const contraseñaHash = bcryptjs.hashSync(password, 10)
                        usuario.from.push(from)
                        usuario.password.push(contraseñaHash)
                        await usuario.save()
                        // JWT
                        const token = jwt.sign({...dataUser}, process.env.SECRET_TOKEN, {expiresIn: '1h'})

                        res.json({
                            success: true,
                            from,
                            response: { token , dataUser },
                            message: from + " has been added to your login methods"
                        })
                    }
                } else {

                    if (contraseñaCoincide.length > 0) {
                         // JWT
                         const token = jwt.sign({...dataUser}, process.env.SECRET_TOKEN, {expiresIn: '1h'})
                         
                        res.json({
                            success: true,
                            from,
                            response: { token, dataUser },
                            message: "Welcome " + dataUser.fullName + ", happy to see you back! " 
                        })

                    } else {

                        res.json({
                            success: false,
                            from,
                            message: "Username or password mismatch"
                        })
                    }
                }
            }

        } catch (err) {
            res.json({
                success: false,
                from: from,
                message: "Oops something went wrong, try again in a few minutes",
                response: err
            })
        }
    },
    verifyMail: async (req, res) => {
        const { string } = req.params
        const user = await Users.findOne({ uniqueString: string })
        try {
            if (user){
                user.emailVerify = true
                await user.save()
                res.redirect('http://localhost:3000/signin')
            }
            else {
                res.json({
                    success: false,
                    from: "verifyMail",
                    message: "You must verify your email before logging in."
                })
            }
        }catch(err){console.log(err)}
    },
    verificarToken: (req, res)=>{
        if(req.user){
            res.json({
                success: true,
                response: { id:req.user.id, fullName:req.user.fullName, email:req.user.email, from:"token", aplication: req.user.aplication },
                message: "Welcome back " + req.user.fullName 
            })
        }else{
            res.json({
                success:false,
                message: "Invalid token, please sign in again"
            })
        }
    },
    forgotPassword: async (req,res)=>{
        const user = req.query.email;
        const serverResponse =  await Users.findOne({ email: user })
        const {fullName,email,from,uniqueString,emailVerify} = serverResponse

        try{
            if(user){
                const subject =  "Password Recovery"
                sendMail('forgotpassword',email, uniqueString,subject)
                res.json({
                    success:true,
                    response:('hi'),
                    message:'We have sent you an email'
                })
            }else{
                res.json({
                    success:false,
                    message: "Email not found"
                })
            }
        }catch(err){
            console.log(err)
        }
        
    }
}

module.exports = userControllers