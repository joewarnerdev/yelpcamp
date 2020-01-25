var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

// Comments New
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    // Find Campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

// Comments Create
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    // Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Something went wrong.");
            console.log(err);
        } else {
            // Create New Comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // Add Username and ID to Comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //Save Comment
                    comment.save();
                    // Connect New Comment to Campground
                    campground.comments.push(comment);
                    campground.save();
                    // Redirect to Show Page
                    req.flash("success", "Successfully added a comment.");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// Comment Edit Route
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

// Comment Update Route
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Comment Destroy Route
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment successfully deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;