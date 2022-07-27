const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
  
} = require('../../controllers/thoughtController');


router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
router.route('/reaction/:thoughtId').post(createReaction);
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction)

module.exports = router;
