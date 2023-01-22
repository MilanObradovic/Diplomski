const mongoose = require('mongoose');
// const mongoose = require('mongoose').set('debug', true);

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
}, {collection: 'Users'});

const Users = mongoose.model('Users', UserSchema);

module.exports = { Users };
