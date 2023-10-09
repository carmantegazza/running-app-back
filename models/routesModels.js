const mongoose = require('mongoose')

const routesSchema = new mongoose.Schema({
    name:{type: String, required: true},
    location:{type: String, required: true},
    distance:{type: Number, required: true},
    elevation_gain:{type: Number},
    estimated_moving_time:{type: Number},
    difficulty:{type: String},
    map:{type: String}
})

const Routes = mongoose.model('routes', routesSchema)

module.exports = Routes