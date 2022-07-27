const { User, Thought } = require('../models');

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No Users found with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },


  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No Users found with this ID' })
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res){
      User.findOneAndDelete({_id: req.params.userId})
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No Users found with this ID' })
        : Thought.findOneAndUpdate(
          { thought: req.params.thoughtId },
          { $pull: { students: req.params.thoughtId } },
          { new: true }
        )
    )
    .then((thought) =>
    !thought
      ? res.status(404).json({
          message: 'The User has been deleted. However Thoughts cannot be found',
        })
      : res.json({ message: 'The User has been successfully deleted' })
  )
      .catch((err) => res.status(500).json(err));
    },

};




