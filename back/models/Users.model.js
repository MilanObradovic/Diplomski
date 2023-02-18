const mongoose = require('mongoose');
// const mongoose = require('mongoose').set('debug', true);
const randToken = require('rand-token');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    token: {
        type: String,
        default: function() {
            return randToken.generate(16);
        }
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
    },
    lastActivity: {
        type: Date,
    },
    apiAccessCounter: {
        type: Number,
    }
}, {collection: 'Users'});

const User = new mongoose.model('User', UserSchema);

module.exports = { User };
