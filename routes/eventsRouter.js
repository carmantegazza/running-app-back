const express = require('express')

const eventsRouter= express.Router()
const eventsController = require('../controllers/eventsController')

eventsRouter.get('/events', eventsController.getEvents)
eventsRouter.get('/events/:_id', eventsController.getEvent)
eventsRouter.post('/events', eventsController.addEvent)

eventsRouter.put('/event/:id', eventsController.updateEvent)
eventsRouter.delete('/event/:id', eventsController.deleteEvent)

eventsRouter.get('/eventforroute/:id', eventsController.getEventsFromOneRoute)

module.exports = eventsRouter