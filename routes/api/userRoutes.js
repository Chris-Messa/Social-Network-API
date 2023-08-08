const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  addFriend,
  deleteUser,
  deleteFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)

router.route('/:userId/friends/:friendId').put(addFriend)

router.route('/:userId/friends/:friendId').delete(deleteFriend)
module.exports = router;
