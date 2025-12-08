import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import User from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const registerUser = asyncHandler( async (req , res)=> {
    const {fullName,email,username,password} = req.body
    console.log("email", email);

    // if (fullName === ""){
    //     throw new ApiError(400,"Full name is required");
    // }

    if(
        [fullName,email,username,password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required");
    }


    const existedUser=User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with given username or email already exists");
    }


    const avatarLoalPath= req.files?.avatar[0]?.path;
    const coverImageLocalPath= require.files?.coverImage[0]?.path;

    if(!avatarLoalPath){
        throw new ApiError (400,"Avatar file is required");
    }

    const avatar=await uploadOnCloudinary(avatarLoalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError (400,"Avatar image is required");
    }

    const user = await User.create({
        fullName,
        email,
        username : username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }

    res.status(201).json (
        new ApiResponse(200, createdUser,"User registered successfully")
    )

})

export {registerUser}