const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Enter your Name"],
    },
    email:{
        type:String,
        required:[true,"Enter Email"],
        unique: true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Enter Password"],
        minLenghth:[4,"Password should be atleast 4 charecters"],
        select:false //password encrypt
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();                         //doesnt update already hashed password
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);
 
