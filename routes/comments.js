// DEPENDENCIES
var express = require("express"),
router      = express.Router({mergeParams: true}),
Profile  = require("../models/profile"),
Comment     = require("../models/comment"),
middleware  = require("../middleware");

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {profile_id: req.params.id, comment: foundComment});
        }
    })
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/profiles/" + req.params.id);
        }
    })
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted.");
            res.redirect("/profiles/" + req.params.id);
        }
    })
});

// NEW COMMENT ROUTE
router.get("/new", middleware.isLoggedIn, function (req, res) {
    // find profile by id
    Profile.findById(req.params.id, function (err, profile) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { profile: profile });
        }
    })
});

// COMMENT CREATION ROUTE
router.post("/", middleware.isLoggedIn, function (req, res) {
    // lookup campgound using ID
    Profile.findById(req.params.id, function (err, profile) {
        if (err) {
            console.log(err);
            res.redirect("/profiles");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                } else {
                    var postCommentDate = new Date();
                    var dd = postCommentDate.getDate();
                    var mm = postCommentDate.getMonth()+1; //January is 0!
                    
                    var yyyy = postCommentDate.getFullYear();
                    if(dd<10){
                        dd='0'+ dd;
                    } 
                    if(mm<10){
                        mm='0'+ mm;
                    } 
                    var CommentDate = dd +'/' + mm +'/' + yyyy;
                    comment.time = postCommentDate;
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment 
                    comment.save();
                    profile.comments.push(comment);
                    profile.save();
                    req.flash("success", "Successfully added comment.");
                    res.redirect('/profiles/' + profile._id);
                }
            })
        }
    });
});

//EXPORTS
module.exports = router;