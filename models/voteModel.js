const mongoose = require('mongoose');
const Post = require('./postModel');

const voteSchema = new mongoose.Schema(
    {
      rating: {
        type: Number,
        min: 1,
        max: 1
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      image: {
        type: mongoose.Schema.ObjectId,
        ref: 'Image',
        required: [true, 'Vote must belong to an image.']
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Vote must belong to a user']
      }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );
  
  voteSchema.index({ image: 1, user: 1 }, { unique: true });
  
  postSchema.pre(/^find/, function(next) {
  
    this.populate({
      path: 'user',
      select: 'name'
    });
    next();
  });
  
  imageSchema.statics.calcVotes = async function(imageId) {
    const stats = await this.aggregate([
      {
        $match: { image: imageId }
      },
      {
        $group: {
          _id: '$image',
          nRating: { $sum: 1 },
        }
      }
    ]);
    // console.log(stats);
  
    if (stats.length > 0) {
      await Post.findByIdAndUpdate(postId, {
        ratingsQuantity: stats[0].nRating,
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        ratingsQuantity: 0,
      });
    }
  };
  
  voteSchema.post('save', function() {
    // this points to current vote
    this.constructor.calcVotes(this.post);
  });
  
  // findByIdAndUpdate
  // findByIdAndDelete
  voteSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    // console.log(this.r);
    next();
  });
  
  voteSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcVotes(this.r.post);
  });
  
  const Vote = mongoose.model('Vote', voteSchema);
  
  module.exports = Vote;