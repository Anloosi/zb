const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');


//@desc Auth User/set token
//route POST /api/users/auth
//@access Public
const authUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user.id);
    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

    
});

//@desc Register a new user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user.id);
       res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
       });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }

});

//@desc Logout user
//route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async(req, res) => {
 res.cookie('jwt', '', {
 httpOnly: true,
 expires: new Date(0),
 });

    res.status(200).json({message:'User logged out'});
});

//@desc Get user profile
//route GET /api/users/profile
//@access Private
const getUserProfile= asyncHandler(async(req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    };

    res.status(200).json(user);
});

//@desc Update user profile
//route PUT /api/users/profile
//@access Private
const updateUserProfile= asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
        user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
    });
    }else {
    res.status(404);
    throw new Error('User not found')
    }
    
});


module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};