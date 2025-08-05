const express = require('express');
const passport = require('passport');
const userModel = require('../models/User');
const router=express.Router();



router.post("/register",async function(req,res,next){
    try{
        const {name, email, password}=req.body;
        const user=new userModel({name,email});
        console.log("register", user);
       const registeredUser= await userModel.register(user,password);
        req.logIn(registeredUser, (err)=>{
            if(err){
                return res.status(500).json({ error: "Login after registration failed" });
            }            
      return res.status(200).json({
        message: "Registration successful",
        user: req.user
      });
        }) 
    }catch(err){
        console.log(err)
        res.render("/register")
    }
})

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // login the user and respond with success
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});


module.exports=router;