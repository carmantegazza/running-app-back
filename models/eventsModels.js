const mongoose = require('mongoose')

const eventsSchema = new mongoose.Schema({
    name:{type: String, required: true},
    // description:{type: String},
    // date:{type: Date},
    // price:{type: Number},
    organizer:{type: String},
    organizer_img:{type: String},
    route: {type: mongoose.Types.ObjectId, ref:'routes'}
})

const Event = mongoose.model('events', eventsSchema)

module.exports = Event