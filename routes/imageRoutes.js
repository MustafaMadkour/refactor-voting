const { Router } = require('express');
const imageContorller = require('../controllers/imageController');
const voteRouter = require('../routes/voteRoutes');
const router = Router();
const {activeUsersOnly} = require('../controllers/authController')

router.use('/:imageId/votes', voteRouter);


router.route('/:imageId')
.put(activeUsersOnly, imageContorller.upvote)
.get(imageContorller.getImage);
module.exports = router;
