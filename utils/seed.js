const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    connection.db.dropDatabase(() => {
        console.log('Data cleared');
    })
    console.log('connected');
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.db.dropCollection('users', function(err, result) {
            if(err) {
                console.log('Error in dropping collection users: ', err);
            } else {
                console.log('Users collection dropped');
            }
        });
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts', function(err, result) {
            if(err) {
                console.log('Error dropping thoughts collection', err);
            } else {
                console.log('Thoughts collection dropped');
            }
        });
    }

    const bob = new User({ username: 'bob', email: 'bob@example.com' });
    const alice = new User({ username: 'alice', email: 'alice@example.com' });

    const thought1 = new Thought({ thoughtText: 'Thinking about food', username: 'bob' });
    const thought2 = new Thought({ thoughtText: 'Thinking about coding', username: 'alice' });

    bob.thoughts.push(thought1._id);
    alice.thoughts.push(thought2._id);
    
    await Promise.all([
        bob.save(),
        alice.save(),
        thought1.save(),
        thought2.save()
      ]);

})