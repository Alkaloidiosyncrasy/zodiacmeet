// DEPENDENCIES
var mongoose = require("mongoose");

// COMMENT SCHEMA
var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    time: String
});

// EXPORTS
module.exports = mongoose.model("Comment", commentSchema);