const { Schema, model } = require('mongoose');
const moment = require('moment');
const ReactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true }
    },

);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

thoughtSchema.set('toJSON', {
    virtuals: true
})

const Thought = mongoose.model('thought', thoughtSchema)

module.exports = Thought