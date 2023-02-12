const mongoose = require('mongoose');
// const mongoose = require('mongoose').set('debug', true);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        default: "user",
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, {collection: 'Users'});

const User = new mongoose.model('User', UserSchema);

module.exports = { User };
