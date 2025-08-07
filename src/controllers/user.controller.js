
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {

    console.log("req.files:", req.files)
    console.log("req.body:", req.body)

    const { fullname, email, username, password, } = req.body



    if ([fullname, username, password, email,].some(
        (field) => field.trim() === ""
    )

    ) {
        throw new ApiError(400, "fullname,username,password,email field are require")
    }

    const existedUser = await User.findOne({

        $or: [{ username }, { email }]

    })

    if (existedUser) {
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath
    if (req.files, Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {

        coverImageLocalPath = req.files.coverImage[0].path
    }



    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if (!avatar) {
        throw new ApiError(400, "upload failed avatar ")
    }



    const user = await User.create({

        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(   // this is check for created user if user cereted then check id 
        "-password -refreshToken"                                            //// this is for remove password

    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering user")

    }

    return res.status(201).json(

        new ApiResponse(200, createdUser, "user registered sucessfully")
    )



})


export default registerUser 