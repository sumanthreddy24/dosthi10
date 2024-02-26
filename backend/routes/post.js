const express = require("express");
const { createPost,getAllPosts ,comment,  deletePost, savePost} = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
router.put("/savePost/:id", authUser, savePost);

router.put("/comment", authUser, comment);
router.delete("/deletePost/:id", authUser, deletePost);
module.exports = router;
