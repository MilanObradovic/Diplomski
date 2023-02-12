const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
    },
    locationName: {
        type: String,
        trim: true,
    },
    q: {
        type: String,
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, {collection: 'Bookmark'});

const Bookmark = new mongoose.model('Bookmark', BookmarkSchema);

module.exports = { Bookmark };
