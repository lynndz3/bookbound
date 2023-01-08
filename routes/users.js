var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get('/', user_controller.user_list);

router.get("/:userId", user_controller.user_books);

router.post("/:userId", user_controller.user_book_create);

module.exports = router;