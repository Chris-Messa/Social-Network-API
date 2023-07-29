const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  reactionId: { 
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
}, { 
  toJSON: { getters: true }, 
  toObject: { getters: true } 
});

module.exports = ReactionSchema
