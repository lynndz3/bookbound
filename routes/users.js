var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get('/', user_controller.user_list);

router.get("/:id", user_controller.user_books);

router.post("/:id", user_controller.user_book_create);

router.post("/:id/delete", user_controller.user_book_delete);

router.post("/:id/edit-book", user_controller.user_book_edit);

module.exports = router;