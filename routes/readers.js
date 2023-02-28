var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");
const book_controller = require("../controllers/bookController");

/* GET users listing. */
router.get("/", user_controller.user_list_get);

router.get("/follow", user_controller.friend_find_get);

router.post("/follow", user_controller.follow_friend);

router.get("/:id", book_controller.user_book_get);

router.post("/:id", book_controller.user_book_create);

router.post("/:id/delete", book_controller.user_book_delete);

router.post("/:id/edit-book", book_controller.user_book_edit);

module.exports = router;
