const { User } = require('../models');

module.exports = {

  addFriends(req, res) {
    console.log('You have just added a new Friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No Users found with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteFriends(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.deleteFriendsId } },
        { runValidators: true, new: true }
      )
      
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No Users found with this ID' })
            : res.json(user) 
        )
        .catch((err) => res.status(500).json(err));
    },
  };



