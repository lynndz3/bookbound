const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: { type: Number },
  title: { type: String, required: true, maxLength: 100 },
  author: { type: String, required: true, maxLength: 100 },
  genre: { type: String },
});

module.exports = mongoose.model("Book", BookSchema);
