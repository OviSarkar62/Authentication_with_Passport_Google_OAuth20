require("dotenv").config();
require("./Config/database");
require("./Config/passport");
const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const USER = require("./Models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const app = express();


app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.set("trust proxy", 1)
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    collectionName: "sessionsdb"
  })
})
);

app.use(passport.initialize());
app.use(passport.session());

// check loggedIn
const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/profile");
    }
    next();
  };

// login : get
app.get("/login", checkLoggedIn, (req, res) => {
    res.render("login");
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: "/profile",
    }),
function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/profile");
    }
  );

  const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };

// profile protected route
app.get("/profile", checkAuthenticated, (req, res) => {
  res.render("profile", { username: req.user.username });
  });

// logout route
app.get("/logout", (req, res) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


module.exports = app;