import mongoose from 'mongoose';
import randToken from 'rand-token';

const UserSchema = new mongoose.Schema(
  {
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
      default() {
        return randToken.generate(16);
      },
    },
    role: {
      type: String,
      default: 'user',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    lastActivity: {
      type: Date,
    },
    apiAccessCounter: {
      type: Number,
    },
    fcmToken: {
      type: String,
    },
  },
  {collection: 'Users'},
);

export const User = new mongoose.model('User', UserSchema);
