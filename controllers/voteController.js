const Vote = require('./../models/voteModel');
// const catchAsync = require('./../utils/catchAsync');

exports.setImageUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.image) req.body.image = req.params.imageId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllVotes 
exports.getVote 
exports.createVote  
exports.deleteVote 
