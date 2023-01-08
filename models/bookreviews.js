const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookReviewSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: String, required: true, maxLength: 100 },
    own_copy: { type: String },
    date_added: { type: Date, default: Date.now, required: true },
    comments: { type: String }
})

module.exports = mongoose.model("Review", BookReviewSchema);