const ErrorHander = require("../servers/backend/utils/errorhander");
const catchAsyncErrors = require("../servers/backend/middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../servers/backend/utils/jwtToken");

//resitration
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const { name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"User sample id",
            url: "profile picture"

        },
    });
    sendToken(user,201,res);

});

// Login
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return next(new ErrorHander("Please Enter Email and Password",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }
    sendToken(user,200,res);
});

//Logout User
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
});

//Get User Details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        user,
    })

})
//update User
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    })
});

//Get all users(admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});


//see single users (admin)

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
if(!user){
    return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`))
}
    res.status(200).json({
        success: true,
        user,
    });
});
//update User Role
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    })
});

//Delete User
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findByIdAndUpdate(req.params.id);
    if(!user){
        return next(new ErrorHander(`User does not exist Id:${req.params.id}`))
    }
    await user.remove();
    res.status(200).json({
        success: true,
    })
});

