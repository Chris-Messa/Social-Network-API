const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Please enter a valid email"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  userSchema.set('toJSON', {
    virtuals: true
  });

  const User = mongoose.model('user', userSchema)

  module.exports = User