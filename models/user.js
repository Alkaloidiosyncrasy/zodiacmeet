// DEPENDENCIES
var mongoose          = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

// USER SCHEMA
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// PASSPORT PLUGIN
UserSchema.plugin(passportLocalMongoose);

// EXPORTS
module.exports = mongoose.model("User", UserSchema);