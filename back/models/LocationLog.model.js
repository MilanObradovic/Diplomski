import mongoose from 'mongoose';

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

export const LocationLog = new mongoose.model('LocationLog', LocationLogSchema);
