const mongoose = require('mongoose');

const LocationLogSchema = new mongoose.Schema({
    locationName: {
        type: String,
        trim: true,
    },
    counter: {
        type: Number,
        default: 1
    }
}, {collection: 'LocationLog'});

const LocationLog = new mongoose.model('LocationLog', LocationLogSchema);

module.exports = { LocationLog };
