const Event = require('../models/eventsModels')

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
          console.error(error); // Log the error to help diagnose the issue
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
    updateEvent: async(req, res) => {
        try {
            const eventId = req.param.id
            const userId = req.body.userId

            const event = await Event.findOne({ _id: eventId });

            if (!event) {
            return res.status(500).json({ success: false, message: 'Event not found' });
            }

            if (event.users.includes(userId)) {
            return res.status(500).json({ success: false, message: 'The user is already signed up fo the event' });
            }

            event.users.push(userId);
            const updatedEvent = await event.save();

            return res.status(200).json({ success: true, event: updatedEvent });
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            return res.status(500).json({ success: false });
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