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
            const users = await Thought.find();

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
            const thought = await Thought1.findOne({ _id: req.params.thoughtId })
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
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}