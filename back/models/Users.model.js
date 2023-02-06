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

// type Plant = {
//     _id: BSON.ObjectId;
//     _partition: string;
//     name: string;
//     sunlight?: string;
//     color?: string;
//     type?: string;
// };


const User = new mongoose.model('User', UserSchema);

module.exports = { User };
