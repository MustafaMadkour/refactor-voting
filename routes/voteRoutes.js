const express = require('express');
const voteController = require('./../controllers/voteController');

const router = express.Router({ mergeParams: true });


router
  .route('/')
  .get(voteController.getAllVotes)
  .post(
    voteController.setImageUserIds,
    voteController.createVote
  );

router
  .route('/:id')
  .get(voteController.getVote)
  .patch(
    voteController.updateVote
  )
  .delete(
    voteController.deleteVote
  );

module.exports = router;