const express = require('express')

const eventsRouter= express.Router()
const eventsController = require('../controllers/eventsController')

eventsRouter.get('/events', eventsController.getEvents)
eventsRouter.get('/event/:_id', eventsController.getEvent)
eventsRouter.post('/events', eventsController.addEvent)

eventsRouter.put('/event/:id', eventsController.updateEvent)
eventsRouter.put('/event/:id', eventsController.unsuscribeFromEvent)
eventsRouter.delete('/event/:id', eventsController.deleteEvent)

eventsRouter.get('/eventforroute/:id', eventsController.getEventsFromOneRoute)

// eventsRouter.delete('/event/:id', eventsController.deleteUserByEvent)

module.exports = eventsRouter
