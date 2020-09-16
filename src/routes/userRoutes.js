const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/users", userController.find);
router.get("/users/count", userController.count);
router.get("/users/:id", userController.findOne);
router.post("/users", userController.save);
router.delete("/users/:id", userController.delete);
router.put("/users/:id", userController.update);

module.exports = router;
