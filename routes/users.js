var express = require('express');
var router = express.Router();
var moongose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var passport = require('passport');

moongose.connect("mongodb://localhost/userdata");
var UserSchema = new moongose.Schema({
  username:String,
  password:String
});
UserSchema.plugin(passportLocalMongoose);
var UserNew = moongose.model("UserNew",UserSchema);
passport.serializeUser(UserNew.serializeUser());
passport.deserializeUser(UserNew.deserializeUser());

/* GET users listing. */
router.get('/', function(req, res, next) {

  // var usersProfile = [
  //   {name:"Mohamud", image:"https://images.unsplash.com/photo-1540952602130-34ce5b4bac66?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=310f5ebc0555955dae51b2e58da05749&auto=format&fit=crop&w=891&q=80"},
  //   {name:"Ephraim",image:"https://images.unsplash.com/photo-1447753072467-2f56032d1d48?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cf3594e2810444abcf8f05655f0ef216&auto=format&fit=crop&w=667&q=80"},
  //   {name:"Susan",image:"https://images.unsplash.com/photo-1447753072467-2f56032d1d48?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cf3594e2810444abcf8f05655f0ef216&auto=format&fit=crop&w=667&q=80"}
  // ];
  UserNew.find({},function(err, usersProfile){
    if(err){
      console.log(err);
    }else{
      res.render("users",{userProf:usersProfile});
    }
  });


  
});

module.exports = router;
