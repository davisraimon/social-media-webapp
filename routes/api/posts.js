const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route  POST api/posts
//@desc   Create a Post
//@access Private
router.post(
  "/",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const user = await User.findById(req.user.id);
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    try {
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      res.status(500).send("Application Server Error");
    }
  }
);
//@route  GET api/posts
//@desc   Get all Post
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send("Application Server Error");
  }
});

//@route  GET api/posts/:id
//@desc   Get a Post by ID
//@access Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "No post found for this ID" });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "No post found for this ID" });
    }
    res.status(500).send("Application Server Error");
  }
});

//@route  DELETE api/posts/:id
//@desc   Delete a Post by ID
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });
    if (!post) {
      return res.status(404).json({ msg: "No post found for this ID" });
    }
    if (post.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete the post" });
    }
    await post.remove();
    res.json({ msg: "Post deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "No post found for this ID" });
    }
    res.status(500).send("Application Server Error");
  }
});
//@route  PUT api/posts/like/:id
//@desc   Like a Post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "No post found for this ID" });
  }
  //checking whether post is already liked or not
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res
      .status(400)
      .json({ msg: "Post is already liked by current user" });
  }
  post.likes.unshift({ user: req.user.id });
  await post.save();
  res.json(post.likes);
});

//@route  PUT api/posts/unlike/:id
//@desc   Unike a Post
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "No post found for this ID" });
  }
  //checking whether post is already liked or not
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return res.status(400).json({ msg: "Post is not like by current user" });
  }
  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();
  res.json(post.likes);
});
//@route  POST api/posts/comments/:id
//@desc   Create a Comment
//@access Private
router.post(
  "/comments/:id",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);
    try {
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).send("Application Server Error");
    }
  }
);

//@route  DELETE api/posts/comments/:id/:comment_id
//@desc   Delete a Comment
//@access Private
router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //pull out comment
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    if (comment.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "user not authorized to remove comment" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(500).send("Application Server Error");
  }
});
module.exports = router;
