
# Social Network API <a name="social network api"></a> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Walkthrough

https://drive.google.com/file/d/1MYCQU10PxDQK_C9qZW0I2z9l9lVP6IKp/view

## Description

This is an API for a social network application that allows user to perform CRUD operations on user profiles, user thoughts, user reactions, and friends lists.

- View Users & Thoughts: API GET routes allow you to view all users and thoughts, with the data displayed in a formatted JSON.

- Manage Users & Thoughts: Using API POST, PUT, and DELETE routes, you can create, update, and delete users and thoughts.

- Manage Reactions: With API POST and DELETE routes, you can create and delete reactions to thoughts.

- Manage Friend Lists: You can add and remove friends to/from a user's friend list.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [MIT](#mit)
- [Tests](#tests)
- [Questions](#questions)

## Installation

First, clone the repository. Then, navigate to the directory of the project. Run `npm install` to install dependencies. You must ensure MongoDB is installed and running on your local machine.

## Usage

Start the server by running the command `npm run start`. You may want to seed your database with provided data using the command `npm run seed`. The mongoose models will sync to your MongoDB database. Use an HTML request tool such as Insomnia or Postman to make the API requests.

## MIT

[License Link](https://opensource.org/licenses/MIT)

## Tests

To test API routes, use Insomnia or Postman.

GET Routes:

- View all users: GET /api/users
- View single user: GET /api/users/:userId
- View all thoughts: GET /api/thoughts
- View single thought: GET /api/thoughts/:thoughtId

POST, PUT & DELETE Routes:

- Create a user: POST /api/users
- Update a user: PUT /api/users/:userId
- Delete a user: DELETE /api/users/:userId
- Create thought: POST /api/thoughts
- Update thought: PUT /api/thoughts/:thoughtID
- Delete thought: DELETE /api/thoughts/:thoughtID

Manage Reactions:

- Add a reaction to a thought: POST /api/thoughts/:thoughtId/reactions
- Delete a reaction: DELETE /api/thoughts/:thoughtId/reactions/:reactionId

Manage Friends:

- Add a friend: POST /api/users/:userId/friends/:friendId
- Remove a friend: DELETE /api/users/:userId/friends/:friendId

## Questions

For any questions or feedback, please open an issue on Github.
