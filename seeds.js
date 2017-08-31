var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {   
        name: "Granite Hill",
        image: "https://farm4.staticflickr.com/3706/10718494266_56543a9eb7.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie, nunc nec ornare luctus, eros lacus consectetur elit, sed ullamcorper est erat ut eros. Duis mattis metus ante. Nullam quis tortor pharetra urna pretium placerat. Fusce non efficitur nulla, et ultrices velit. In tortor erat, pretium quis consectetur vel, cursus eu magna. Nam eget odio consectetur, dictum sem nec, porttitor lacus. Etiam non risus dolor. Morbi placerat nunc ac enim tincidunt, sed tincidunt ex rhoncus. Fusce quis diam convallis, tempus quam porta, vehicula diam. Vivamus et lorem at velit tristique accumsan. Morbi nec suscipit tellus, ut eleifend risus. Nullam convallis sapien eget feugiat vehicula. Curabitur ut porttitor felis, sed placerat lorem. Ut iaculis, risus ac pharetra commodo, neque ligula porttitor felis, vitae feugiat risus augue eu justo. Ut rutrum a nulla in tristique." 
    },
    { 
        name: "Sandcamp", 
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie, nunc nec ornare luctus, eros lacus consectetur elit, sed ullamcorper est erat ut eros. Duis mattis metus ante. Nullam quis tortor pharetra urna pretium placerat. Fusce non efficitur nulla, et ultrices velit. In tortor erat, pretium quis consectetur vel, cursus eu magna. Nam eget odio consectetur, dictum sem nec, porttitor lacus. Etiam non risus dolor. Morbi placerat nunc ac enim tincidunt, sed tincidunt ex rhoncus. Fusce quis diam convallis, tempus quam porta, vehicula diam. Vivamus et lorem at velit tristique accumsan. Morbi nec suscipit tellus, ut eleifend risus. Nullam convallis sapien eget feugiat vehicula. Curabitur ut porttitor felis, sed placerat lorem. Ut iaculis, risus ac pharetra commodo, neque ligula porttitor felis, vitae feugiat risus augue eu justo. Ut rutrum a nulla in tristique."
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a campground.")
                        //add a few comments
                        Comment.create({ text: "This place is great.", author: "Homer" }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("added a comment.")
                            }

                        });
                    }
                })
            })

        }
    });
}

module.exports = seedDB;