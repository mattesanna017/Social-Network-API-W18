const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,

  
} = require('../../controllers/userController');

const {addFriends, deleteFriends} = require('../../controllers/friendsController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
router.route('/addfriend/:userId').post(addFriends);
router.route('/:userId/deletefriend/:deletefriendsId').delete(deleteFriends);



module.exports = router;
