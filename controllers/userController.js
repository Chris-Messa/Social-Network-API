const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

const userCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
}

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                userCount: await userCount()
            }
            res.json(userObj)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                { new: true, runValidators: true } 
                )
                if (!user) {
                    return res.status(404).json({ message: 'No user with this id' })
                }
                res.json(user)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndRemove(req.params.userId);
            if(!user) {
                return res.status(404).json({ message: 'No user with this id' })
            }

            res.status(200).json({ message: 'User deleted' })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            )
            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }
            res.send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}