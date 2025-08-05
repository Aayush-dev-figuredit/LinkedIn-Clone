const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/LinkedIn")
.then(()=>{console.log("MongoDB connected");
})
.catch(err=>console.error("MongoDB error", err)
);

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
});
userSchema.plugin(passportLocalMongoose,{
    usernameField:'email'
})
module.exports=mongoose.model("User", userSchema)