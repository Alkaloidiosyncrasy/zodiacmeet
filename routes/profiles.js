// DEPENDENCIES
var express = require("express"),
router      = express.Router(),
Profile     = require("../models/profile"),
middleware  = require("../middleware");


// INDEX - SHOW ALL PROFILES
router.get("/", function (req, res) {
    // get all profiles from database    
    Profile.find({}, function (err, allProfiles) {
        if (err) {
            console.log(err);
        } else {
            res.render("profiles/profiles", { profiles: allProfiles });
        }
    });
});

// CREATE - ADD A NEW PROFILE TO DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newProfile = { name: name, age: age, image: image, description: description, author: author };
    // create a new profile and save to DB
    Profile.create(newProfile, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to profiles page
            console.log(newlyCreated);
            res.redirect("/profiles");
        }
    });
});

// NEW - SHOW FORM TO CREATE A NEW PROFILE
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("profile/new.ejs");
});

//SHOW - SHOWS MORE INFO ABOUT ONE PROFILE
router.get("/:id", function (req, res) {
    // find the profile with provided ID
    Profile.findById(req.params.id).populate("comments").exec(function (err, foundProfile) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundProfile);
            // render show template with that profile
            res.render("profiles/show", { profile: foundProfile });
        }
    });
});

// EDIT PROFILE ROUTE
router.get("/:id/edit", middleware.checkProfileOwnership, function (req, res) {
    Profile.findById(req.params.id, function (err, foundProfile) {
        res.render("profiles/edit", { profile: foundProfile });
    });
});

// UPDATE PROFILE ROUTE
router.put("/:id", middleware.checkProfileOwnership, function (req, res) {
    // find and update the correct profile
    Profile.findByIdAndUpdate(req.params.id, req.body.profile, function (err, updatedProfile) {
        if (err) {
            res.redirect("/profiles");
        } else {
            // redirect to showpage
            res.redirect("/profiles/" + req.params.id);
        }
    })
});

// DESTROY PROFILE ROUTE
router.delete("/:id", middleware.checkProfileOwnership, function (req, res) {
    Profile.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/profiles");
        } else {
            res.redirect("/profiles");
        }
    })
});

// EXPORTS
module.exports = router;