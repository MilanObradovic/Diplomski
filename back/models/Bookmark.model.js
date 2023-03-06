import mongoose from 'mongoose';

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

export const Bookmark = new mongoose.model('Bookmark', BookmarkSchema);
