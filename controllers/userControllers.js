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
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            //refreshToken: process.env.GOOGLE_REFRESHTOKE,
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
        html: `<head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>Verify email</title><!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]--><!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet"><!--<![endif]--><!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
        <style type="text/css">
      #outlook a {
          padding:0;
      }
      .es-button {
          mso-style-priority:100!important;
          text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
          color:inherit!important;
          text-decoration:none!important;
          font-size:inherit!important;
          font-family:inherit!important;
          font-weight:inherit!important;
          line-height:inherit!important;
      }
      .es-desk-hidden {
          display:none;
          float:left;
          overflow:hidden;
          width:0;
          max-height:0;
          line-height:0;
          mso-hide:all;
      }
      .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
          background:#344e5a!important;
      }
      .es-button-border:hover {
          border-color:#42d159 #42d159 #42d159 #42d159!important;
          background:#344e5a!important;
      }
      @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
      @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
      </style>
       </head>
       <body style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FFFFFF"><!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#ffffff"></v:fill>
                  </v:background>
              <![endif]-->
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
           <tr>
            <td valign="top" style="padding:0;Margin:0">
             <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr>
                <td align="center" bgcolor="#6fa8dc" style="padding:0;Margin:0;background-color:#6fa8dc">
                 <table bgcolor="#6fa8dc" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#6fa8dc;width:600px">
                   <tr>
                    <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0"
                                  cellspacing="0"><tr><td style="width:271px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:271px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                              <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://firebasestorage.googleapis.com/v0/b/desarrolloweb-cacmindhub.appspot.com/o/running-app%2Femail%2Flogo.png?alt=media&amp;token=d55f0ae7-a172-4095-b1c6-55baed14a8fb" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" width="116" title="Logo"></td>
                          </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:269px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:269px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;font-size:0">
                             <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><img src="https://ebugkvs.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png" alt="Fb" title="Facebook" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><img src="https://ebugkvs.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png" alt="Ig" title="Instagram" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                <td align="center" valign="top" style="padding:0;Margin:0"><img src="https://ebugkvs.stripocdn.email/content/assets/img/social-icons/circle-colored/youtube-circle-colored.png" alt="Yt" title="Youtube" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr>
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                         <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-left:1px solid #22333b;border-right:1px solid #22333b;border-top:1px solid #22333b;border-bottom:1px solid #22333b">
                           <tr class="es-visible-simple-html-only">
                            <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;line-height:48px;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;font-size:40px;font-style:normal;font-weight:normal;color:#0b5394">Welcome to Training-app</h1></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://firebasestorage.googleapis.com/v0/b/desarrolloweb-cacmindhub.appspot.com/o/running-app%2Femail%2Femail235922_1.webp?alt=media&amp;token=9496dc39-12dc-4f39-ae6b-2e7f08583f72" alt="Training-app" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" width="558" title="Training-app"></td>
                           </tr>
                           <tr>
                            <td align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px"><h1 style="Margin:0;line-height:39px;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;font-size:26px;font-style:normal;font-weight:normal;color:#5E503F">Please click on the <a href=http://localhost:4000/api/users/auth/${type}/${uniqueString}>following link</a><br></h1><h1 style="Margin:0;line-height:39px;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;font-size:26px;font-style:normal;font-weight:normal;color:#5E503F">&nbsp;to verify your account</h1></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0"><!--[if mso]><a href="" target="_blank" hidden>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" 
                      style="height:41px; v-text-anchor:middle; width:558px" arcsize="0%" stroke="f"  fillcolor="#22333b">
              <w:anchorlock></w:anchorlock>
              <center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>Thank you for Signing up with us</center>
          </v:roundrect></a>
      <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#22333B;border-width:0px;display:block;border-radius:0px;width:auto;mso-hide:all"><a href="" class="es-button msohide" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 20px 10px 20px;display:block;background:#22333B;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #22333B;mso-hide:all;padding-left:20px;padding-right:20px">Thank you for Signing up with us</a></span><!--<![endif]--></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr>
                <td align="center" style="padding:0;Margin:0">
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                   <tr>
                    <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:194px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:174px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-left:1px solid #22333b;border-right:1px solid #22333b;border-top:1px solid #22333b;border-bottom:1px solid #22333b">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px;font-size:0px"><img src="https://firebasestorage.googleapis.com/v0/b/desarrolloweb-cacmindhub.appspot.com/o/running-app%2Femail%2Fmail1.png?alt=media&amp;token=c3775475-b1cf-412e-a335-22075057c5b6" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0b5394">BEST <strong>ROUTES</strong></h3></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#0b5394;font-size:14px">30 - Day Return Policy</p></td>
                           </tr>
                         </table></td>
                        <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:173px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:173px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-left:1px solid #22333b;border-right:1px solid #22333b;border-top:1px solid #22333b;border-bottom:1px solid #22333b">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px;font-size:0px"><img src="https://firebasestorage.googleapis.com/v0/b/desarrolloweb-cacmindhub.appspot.com/o/running-app%2Femail%2Fmail2.png?alt=media&amp;token=3a2554a1-3354-453d-910f-849de593969b" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0b5394">REGISTER <b>NOW</b></h3></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#0b5394;font-size:14px">From $50 on all Events</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:173px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:173px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-left:1px solid #22333b;border-right:1px solid #22333b;border-top:1px solid #22333b;border-bottom:1px solid #22333b">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px;font-size:0px"><img src="https://firebasestorage.googleapis.com/v0/b/desarrolloweb-cacmindhub.appspot.com/o/running-app%2Femail%2Fmail3.png?alt=media&amp;token=b085b0f9-fa99-4c9d-8800-cc85776330cb" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0b5394">WORLDWIDE</h3></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#0b5394;font-size:14px">Routes and Events</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr>
                <td align="center" bgcolor="#cfe2f3" style="padding:0;Margin:0;background-color:#cfe2f3">
                 <table bgcolor="#cfe2f3" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#cfe2f3;width:600px">
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px">
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="left" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:normal;color:#5E503F">Discover tr<strong>AI</strong>ning Run to the beat of Your Goals</h2></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:35px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:35px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:15px;font-size:0px"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#5E503F;font-size:14px"><img src="https://ebugkvs.stripocdn.email/content/guids/CABINET_b4ecf5805d9b894132453617fdb174cb/images/20201624525571283_yeu.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="35"></a></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:505px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:505px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#5E503F;font-size:14px">Routes and Events resources.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#5E503F;font-size:14px">If it's been run or ridden, it's on Training-app. With millions of athletes all over the world. If you're looking for an adventure or want to make a route of your own, we can find you a place to go.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:35px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:35px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:15px;font-size:0px"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#5E503F;font-size:14px"><img src="https://ebugkvs.stripocdn.email/content/guids/CABINET_b4ecf5805d9b894132453617fdb174cb/images/57741624525571446_y6v.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="35"></a></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:505px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:505px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#5E503F;font-size:14px">You can use Training-app to build a route of your own, or get inspired by a friend's activity and send their route to your phone or GPS device.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:35px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:35px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:15px;font-size:0px"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#5E503F;font-size:14px"><img src="https://ebugkvs.stripocdn.email/content/guids/CABINET_b4ecf5805d9b894132453617fdb174cb/images/78861624525571446_QJm.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="35"></a></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:505px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:505px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#5E503F;font-size:14px">Whether you're in a new city or just looking to rediscover your own, heatmaps give you an instant look at routes that get the most activity.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:35px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:35px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:5px;font-size:0px"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#5E503F;font-size:14px"><img src="https://ebugkvs.stripocdn.email/content/guids/CABINET_b4ecf5805d9b894132453617fdb174cb/images/26241624525571436_CqN.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="35"></a></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:505px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:505px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#5E503F;font-size:14px">A new race takes place anywhere you like. It fits in with your lifestyle and around your commitments. You run at your pace, in your own time. You can complete it on a treadmill, outdoors, running track, as part of your social runs or club runs. You can also use other race results and parkrun data, both can boost your miles. If you're running, jogging, plodding or walking, then you're an Awesome Runner.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                   <tr>
                    <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:0px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0"><!--[if mso]><a href="" target="_blank" hidden>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" 
                      style="height:41px; v-text-anchor:middle; width:560px" arcsize="0%" stroke="f"  fillcolor="#22333b">
              <w:anchorlock></w:anchorlock>
              <center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>MORE INFO</center>
          </v:roundrect></a>
      <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#22333B;border-width:0px;display:block;border-radius:0px;width:auto;mso-hide:all"><a href="" class="es-button msohide" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 20px 10px 20px;display:block;background:#22333B;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #22333B;mso-hide:all;padding-left:20px;padding-right:20px">MORE INFO</a></span><!--<![endif]--></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr>
                <td align="center" bgcolor="#6fa8dc" style="padding:0;Margin:0;background-color:#6fa8dc">
                 <table bgcolor="#6fa8dc" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#6fa8dc;width:600px">
                   <tr>
                    <td align="left" style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr>
                        <td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:270px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://firebasestorage.googleapis.com/v0/b/desarrolloweb-cacmindhub.appspot.com/o/running-app%2Femail%2Flogo.png?alt=media&amp;token=d55f0ae7-a172-4095-b1c6-55baed14a8fb" alt="Training App" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" width="88" title="Training App"></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;font-size:0">
                             <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:15px"><img title="Facebook" src="https://ebugkvs.stripocdn.email/content/assets/img/social-icons/circle-white/facebook-circle-white.png" alt="Fb" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px"></td>
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:15px"><img title="Instagram" src="https://ebugkvs.stripocdn.email/content/assets/img/social-icons/circle-white/instagram-circle-white.png" alt="Inst" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px"></td>
                                <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://ebugkvs.stripocdn.email/content/assets/img/social-icons/circle-white/youtube-circle-white.png" alt="Yt" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:270px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:18px;color:#ffffff;font-size:12px">© Copyright<br>All Right Reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px"><a href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:12px" target="_blank">Privacy Policy</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px"><a href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ffffff;font-size:12px" target="_blank">Terms of us</a></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
        </div>
       </body>` 
    }
    
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
                    
                    let mail = await sendMail('verifyEmail',email, uniqueString,"Email Verification Link")

                    if(mail.success){
                        console.log('this is mail success' + mail.success)

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

    sendEmail: async (req,res)=>{
        let uniqueString
        const { fullName, email, password, from, aplication } = req.body.userData
        let user = await Users.findOne({ email })
            .then(res => uniqueString = res.uniqueString)

        let mail = await sendMail('verifyEmail',email, uniqueString,"Email Verification Link")

        if(mail.success){
            res.json({
            success: true,
            from: from,
            message: " Validation email successfully sent to " + email,
            })
        }else{          
            res.json({
                success: false,
                from: from,
                message: 'There was a problem while sending validation to ' + email + ' please, try again or correct your email',
            })
        }
    },

    deleteDocument: async (req,res)=>{
        
        try{
            
            const { firstName, email, password, from} = req.body
            let userId = await Users.findOne({ email })
            .then(res => {
                return res.id
            })

            await Users.findByIdAndDelete(userId)
            return res.status(200).json({success:true,message:'User deleted successfully'})
        }catch(err){
            console.log(err.message)
            return res.status(500).json({success:false,message:'Internal server error'})
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
        console.log(req.body.userData)

        try {
            const usuario = await Users.findOne({ email })
            console.log(usuario)

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
                res.redirect('http://localhost:3000/login')
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
        
    },

    addFavEvent: async (req, res) => {
        try {
          const userId = req.params.id;
          const eventId = req.body.eventId;
      
          const user = await Users.findOne({ _id: userId });
      
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
      
          if (user.favEvents.includes(eventId)) {
            return res.status(400).json({ success: false, message: 'The event is already in favourites' });
          }
      
          user.favEvents.push(eventId);
          const updatedUser = await user.save();
      
          return res.status(200).json({ success: true, event: updatedUser });
        } catch (error) {
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
      },
      getUser: async(req, res) => {
        try {
            const route = await Users.findById(req.params.id)
            return res.status(200).json({success:true, message: 'User found', route: route})
        } catch (error) {
            return res.status(500).json({success:false})
        }
    },
}

module.exports = userControllers