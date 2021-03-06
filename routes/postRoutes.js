const express = require("express");
const postController = require("../controllers/postController");
const { activeUsersOnly } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    // activeUsersOnly,
    postController.uploadImages,
    postController.createPost
  );

router
  .route("/:id")
  .get(postController.getPost);

module.exports = router;
