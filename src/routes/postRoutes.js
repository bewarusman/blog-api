const router = require("express").Router();
const { postController } = require("../controllers");

router.get("/posts", postController.find);
router.get("/posts/count", postController.count);
router.get("/posts/:id", postController.findOne);
router.post("/posts", postController.save);
router.delete("/posts/:id", postController.delete);
router.put("/posts/:id", postController.update);
router.post("/posts/:id/comments", postController.saveComment);
router.delete(
  "/posts/:postId/comments/:commentId",
  postController.deleteComment
);

module.exports = router;
