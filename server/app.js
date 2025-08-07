// server/app.js
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('dotenv').config();
// require('./config/passportConfig')(passport);
const userModel=require("./models/User")
// const localStrategy = require("passport-local");




const authRoutes = require('./routes/authRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: "shh",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new localStrategy(userModel.authenticate()));
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


// Mount routes
app.use('/auth', authRoutes);

module.exports = app;
