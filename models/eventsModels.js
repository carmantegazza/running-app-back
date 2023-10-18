const mongoose = require('mongoose')

const eventsSchema = new mongoose.Schema({
    name:{type: String, required: true},
    date:{type: Date},
    organizer:{type: String},
    organizer_img:{type: String},
    route_place:{type: String}
})

const Events = mongoose.model('events', eventsSchema)

module.exports = Events