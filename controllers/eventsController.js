const Event = require('../models/eventsModels')
const Route = require('../models/routesModels')

const eventsController = {
    getEvents: async(req, res) => {
        try {
            const events = await Event.find()
            return res.json({message: 'events', events: events})
        } catch (error) {
            return res.status(500).json({success:false})
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
            const event = await Event.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
            return res.status(200).json({success:true, event:event})
        } catch (error) {
            return res.status(500).json({success:false})
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