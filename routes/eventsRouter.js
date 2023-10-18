const express = require('express')

const eventsRouter= express.Router()
const eventsController = require('../controllers/eventsController')

eventsRouter.get('/events', eventsController.getEvents)
eventsRouter.post('/events', eventsController.addEvent)

eventsRouter.put('/event:id', eventsController.updateEvent)

module.exports = eventsRouter