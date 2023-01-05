const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    id:  { type: Number },
    title: { type: String, required: true, maxLength: 100 },
    author: { type: String, required: true, maxLength: 100 },
    genre: { type: String, enum: ["SciFi/Fantasy", "Mystery/Crime", "Short Stories", "Historical Fiction", "Beach Read", "Fiction (general)", "Non-Fiction, Memoir", "Learning/Fact-Based" ]}
})

module.exports = mongoose.model("Book", BookSchema);