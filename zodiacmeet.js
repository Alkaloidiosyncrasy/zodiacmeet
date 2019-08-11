// DEPENDENCIES
var express    = require("express"),
app            = express(),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
passport       = require("passport"),
LocalStrategy  = require("passport-local"),
methodOverride = require("method-override"),
flash          = require("connect-flash"),
User           = require("./models/user"),
Profile        = require("./models/profile"),
Comment        = require("./models/comment");
//seedDB         = require("./seeds.js");
//mongodb        = require("mongodb");

// REQUIRING ROUTES
var indexRoutes  = require("./routes/index"),
profileRoutes    = require("./routes/profiles"),
commentRoutes    = require("./routes/comments");


// CONNECTING TO A DB USING ENVIRONMENT VARIABLE
// mongoose.connect(process.env.DATABASE URL);

// CONNECTING TO LOCAL MONGODB
mongoose.connect("mongodb://127.0.0.1:27017", { useMongoClient: true });

// CONNECTING TO mLab (MONGODB HOSTING SITE)
//mongoose.connect("mongodb://Alkaloid:diolakla@ds111804.mlab.com:11804/ayelpcamp", { useMongoClient: true });

// APP MIDDLEWARE SETUP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

// SEED THE DB
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "terces",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SETTING THE CURRENT USER AND FLASH MESSAGES
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// SETTING THE ROUTES
app.use("/", indexRoutes);
app.use("/profiles", profileRoutes);
app.use("/profiles/:id/comments", commentRoutes);

//SETTING THE PORT
app.set('port', (process.env.PORT || 5000));

// AVOIDING HEROKU $PORT ERROR
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

//STARTING THE APP ON A LOCAL SERVER
/* app.listen(3000, function () {
    console.log("ZodiacMeet server has started!");
}); */