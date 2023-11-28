const mongoose = require('mongoose')

const eventsSchema = new mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    organizer:{type: String, required: true},
    organizer_img:{type: String},
    route: {type: mongoose.Types.ObjectId, ref:'routes'},
    usersJoin: {type: Array},
    date:{type: Date}
})

const Event = mongoose.model('events', eventsSchema)

module.exports = Event