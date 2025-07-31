import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploaduploadOnClodinary } from '..//utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {

    res.status(200).json({


        message: 'ok'


    })


    const { email, name, password } = req.body

    console.log("email", email)

    if ([fullname, name, password, email].some(
        (feild) => feild.trim() === ""
    )

    ) {
        throw new ApiError(400, "all feild are require")
    }

    const existedUser = User.findOne({

        $or: [{ username }, { email }]

    })

    if (existedUser) {
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverimageLocalPath = req.files?.coverimage[0]?.path;


    if (!avatarLocalPath) {
        throw new ApiError(400, "required avatar file")
    }

    if (!coverimageLocalPath) {
        throw new ApiError(400, "coverImage also required")
    }

    const avatar = await uploaduploadOnClodinary(avatarLocalPath)
    const coverImage = await uploaduploadOnClodinary(coverimageLocalPath)


    if (!avatar) {
        throw new ApiError(400, "required avatar file")
    }


    const user = await User.create({

        fullName,
        avatar: avatar.url,
        coverimage: coverImage?.url || "",
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