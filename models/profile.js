// DEPENDENCIES
var mongoose = require("mongoose");

// SCHEMA SETUP
var profileSchema = new mongoose.Schema({
    name: String,
    day: Number,
    month: Number,
    year: Number,
    time: Number,
    place: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// EXPORTS
module.exports = mongoose.model("Profile", profileSchema);