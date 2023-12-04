const Event = require('../models/eventsModels')
const Users = require('../models/userModel')
const nodemailer = require('nodemailer')
const { google } = require('googleapis') 
const OAuth2 = google.auth.OAuth2


const sendEventEmail = async (email, emailSubject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user:"aprosgonzalo@gmail.com",
      type: "OAuth2",
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret:process.env.GOOGLE_SECRET,
      refreshToken: process.env.GOOGLE_REFRESHTOKEN,
      accessToken: accessToken
  },
  tls:{
      rejectUnauthorized: false
  } 
  });
  
  const mailOptions = {
    from: "Training App",
    to: email,
    subject: emailSubject,
    text: 'mail de aviso de evento'
    
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

const eventsController = {
    getEvents: async(req, res) => {
        try {
            const events = await Event.find()
            return res.json({message: 'events', events: events})
        } catch (error) {
            return res.status(500).json({success:false})
        }
    },
    getEvent: async (req, res) => {
        try {
          const event = await Event.findById(req.params._id);
          if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
          }
          return res.status(200).json({ success: true, message: 'Found event', event: event });
        } catch (error) {
          console.error(error); 
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
      },
      
    addEvent: async(req, res) => {
        try {
            const newEvent = await Event.create(req.body)
            return res.status(201).json({success: true, event: newEvent})
        } catch (error) {
            return res.status(500).json({success:false})
        }
    },
    updateEvent: async (req, res) => {
        try {
          const eventId = req.params.id;
          const userId = req.body.userId;
          console.log(eventId)
          console.log(userId) 

          const event = await Event.findOne({ _id: eventId });

          const user = await Users.findOne({_id: userId});
          
          if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
          }
      
          if (event.usersJoin.includes(userId)) {
            return res.status(400).json({ success: false, message: 'The user is already signed up for the event' });
          }
      
          event.usersJoin.push(userId);
          sendEventEmail(user.email)
          const updatedEvent = await event.save();
          console.log(updatedEvent)
          return res.status(200).json({ success: true, event: updatedEvent });
        } catch (error) {
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
      },

    deleteEvent: async(req, res) => {
        try {
            await Event.findOneAndDelete({_id:req.params.id})
            return res.status(200).json({success:true, message: 'deleted event'})
        } catch (error) {
            return res.status(500).json({success:false})
        }
    },

    getEventsFromOneRoute: async(req, res) => {
        let events = []
        let {id} = req.params
        try {
            events = await Event.find({route:id}).populate('route', {name:1}, {difficulty:1})
            return res.status(200).json({success:true, events:events})    
        } catch (error) {
            return res.status(500).json({success:false})
        }
    }
}



module.exports = eventsController