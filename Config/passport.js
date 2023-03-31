require("dotenv").config();
const USER = require("../Models/userModel");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
    USER.findOne({ googleId: profile.id })
      .then(user => {
        if (!user) {
          let newUser = new USER({
            googleId: profile.id,
            username: profile.displayName,
          });
          return newUser.save();
        } else {
          return user;
        }
      })
      .then(user => cb(null, user))
      .catch(err => cb(err, null));
  }
));

  // create session id
  passport.serializeUser((user,done)=>{
    done(null,user.id);
  });

  // find session info using session id
  passport.deserializeUser(async(id,done)=>{
    try{
        const user = await USER.findById(id);
        done(null,user);
    } catch(error){
        done(error, false);
    }
  })