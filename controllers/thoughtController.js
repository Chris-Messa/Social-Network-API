const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const thoughtCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
      .count('thoughtCount');
    return numberOfThoughts;
}


module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            const thoughtObj = {
                thoughts,
                thoughtCount: await thoughtCount()
            }
            res.json(thoughtObj)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({
                thought
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true, runValidators: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' })
            }
           res.json(thought)
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndRemove(req.params.thoughtId);
            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id' })
            }
            res.status(200).json({ message: 'Thought deleted' })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id'})
            }
            const reaction = {
                reactionBody: req.body.reactionBody,
                username: req.body.username
            }
            thought.reactions.push(reaction);
            await thought.save();
            res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id'})
            }
            const reaction = await ReactionSchema.findByIdAndRemove(req.params.reactionId);
            
        } catch (err) {
            
        }
    }
}