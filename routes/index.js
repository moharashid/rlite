var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var moongose = require('mongoose');
// var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var passport = require('passport');


moongose.connect("mongodb://localhost/userdata");

var UserSchema = new moongose.Schema({
    username:String,
    password:String
});
UserSchema.plugin(passportLocalMongoose);
var User = moongose.model("User",UserSchema);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create schema and db
moongose.connect("mongodb://localhost/reddit_lite");

//schema
var redditSchema= new moongose.Schema({
  topic:String,
  details:String,
  image:String
});

//models
var RedditFeeds = moongose.model("RedditFeeds",redditSchema);
//CRUD Create Read Update Delete





/* GET home page. */
router.get('/', function(req, res, next) {
  // 
  //fetch data from db
  RedditFeeds.find({},function(err, allFeeds){
    if(err){
      console.log(err);
    }else{
      res.render('index',{feeds:allFeeds});
    }
  });
});
router.get('/addfeeds',function(req,res,next){
  res.render("addfeeds");
});
router.get('/signup',function(req,res,next){
  res.render("signup");
});
router.post("/signup",function(req,res,next){
  User.register(new User({username: req.body.email}),req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('signup');
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/users");
      console.log(user);
    });
  });
});
router.get('/login',function(req,res,next){
  res.render("login");
});
router.post('/addfeeds',function(req, res, next){
  var topic= req.body.subj;
  var details = req.body.Details;
  var image = req.body.image;

  var feedsToAdd = {topic:topic, details:details ,image:image};
  RedditFeeds.create(
    feedsToAdd,
    function(err,allFeeds){
      if(err){
        console.log(err);
      }else{
        console.log("Record created");
        console.log(allFeeds);
        res.redirect("/");
      }
    }
    
  );
  //redirect back to feeds
  
});


module.exports = router;
