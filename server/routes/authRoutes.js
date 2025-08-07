const express = require('express');
const passport = require('passport');
const userModel = require('../models/User');
const router=express.Router();
const Profile=require("../models/Profile")
const Post = require('../models/Post');


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

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

router.post('/createProfile', async (req, res) => {
 try {
    const { fullName, bio, education, skills, location } = req.body;

    const profileExists = await Profile.findOne({ user: req.user._id });

    if (profileExists) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const newProfile = new Profile({
      user: req.user._id,
      fullName:req.body.fullName,
      bio:req.body.bio,
      education:req.body.education,
      location:req.body.location,
      skills: skills.split(',').map(skill => skill.trim())
    });
    console.log(req.body);
    

    await newProfile.save();

    res.status(201).json({ message: "Profile created successfully", profile: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/profile",isLoggedIn, async function(req,res){
  try{
  const  profile= await Profile.findOne({user:req.user._id})
  if(!profile){
    return res.status(404).json({ error: 'Profile not found' });
  
  }
  res.json(profile)
}catch(err){
  res.status(500).json({error:'something went wrong'})
}
})

router.post("/posts", isLoggedIn, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content is required" });
console.log("req id",  req.user);

  try {
    const newPost = new Post({
      user: req.user.id, // assuming user id is added by middleware
      content,
    });
    const savedPost=await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post", err);
    
    res.status(500).json({ message: "Error creating post",err});
  }
});


router.get("/myposts", isLoggedIn, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});
// GET /auth/publicfeed — get all posts by all users
router.get("/publicfeed", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "name") // Only get fullName from user
      .sort({ createdAt: -1 }); // Newest first

    res.json(posts);
  } catch (err) {
    console.error("Error in publicfeed route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});






module.exports=router;