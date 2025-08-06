import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";


export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({
        success: false,
        message: "Please provide all required fields",
        error: true,
      });
    }
    const users = await UserModel.findOne({ email });
    if (users) {
      return response.status(400).json({
        success: false,
        message: " Already registered with this email",
        error: true,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const payload = {
      name,
      email,
      password: hashPassword,
    };
    const newuser = new UserModel(payload);
    const save = await newuser.save();
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;
    await sendEmail({
      sendTo: email,
      subject: "Verify your email",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });
    return response.json({
      message: "User registered successfully",
      success: true,
      error: false,
      data: save,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return response.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return response.status(400).json({
        message: "invalid code",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );
    return response.json({
      message: "email verified",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

//login controller
/*
export async function loginController(request, response) {
    try {
        const { email, password } = request.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "user is not registered",
                error: true,
                success: false,
            });
        }
        if (user.status !== "Active") {
            return response.status(400).json({
                message: "contact to admin",
                error: true,
                success: false,
            });
        }
        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return response.status(400).json({
                message: "check your password",
                error: true,
                success: false,
            });
        }
        //now we will send two tokens access token and refresh token
        const accesstoken = await generatedAccessToken(user._id);
        const refreshtoken = await generatedRefreshToken(user._id);

        return response.json({
            message: "Login successful",
            success: true,
            error: false,
            accesstoken,
            refreshtoken,
        });
    } catch (error) {
        return response.status(500).json({
            error: true,
            success: false,
            message: error.message || error,
        });
    }
}*/
export async function loginController(request, response) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400)({
        message: "provide email & password  ",
        error: true,
        success: false,
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "User is not registered",
        error: true,
        success: false,
      });
    }

    // Check if user is active
    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Account not active. Please contact admin",
        error: true,
        success: false,
      });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(400).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }

    // Generate tokens
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

   const updateUser =await UserModel.findByIdAndUpdate(user?._id,{
    last_login_date:new Date()

   })

   const isProduction = process.env.NODE_ENV === 'production';

const cookiesOption = {
  httpOnly: true,
  secure: isProduction, // Only true in production
  sameSite: isProduction ? "None" : "Lax",
};

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    // Successful login response
    return response.json({
      message: "Login successful",
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

//logout controller
export async function logoutController(request, response) {
  try {
    const userid = request.userId; ///midleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);
    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return response.json({
      message: "logged out!",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// upload user avatar
export async function uploadAvatar(request, response) {
  try {
    const userId = request.userId; //auth middleware
    const image = request.file; // multer middleware
     if (!image) {
            return response.status(400).json({
                message: "No image file provided",
                error: true,
                success: false
            });
        }

    const upload = await uploadImageCloudinary(image);
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.secure_url},
    {
      new:true
    });
    return response.json({
      message: "uploaded profile successfully",
      data: {
        _id: userId,
        avatar: upload.secure_url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.messege || error,
      success: false,
      error: true,
    });
  }
}

// update user details
export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId; //auth middleware
    const { name, email, mobile, password } = request.body;
    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
      
    );
    return response.json({
      message: "updates made successfully",
      error: false,
      success: true,
      data: {
        updateUser,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// forget password
// for using this cotroller useer need not to login
export async function forgotPasswordController(request, response) {
  try {
    //first we will take the mail id from the user who has forgotten the password
    const { email } = request.body;
    // Add at top of forgotPasswordController
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({
        message: "Invalid email address",
        error: true,
        success: false,
      });
    }
    //we will verify weather the mail entered exists in the data base or not

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "email id not registered!!",
        error: true,
        success: false,
      });
    }
    const otp = generatedOtp();
const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime,
    });
    await sendEmail({
      sendTo: email,
      subject: "forgot password otp from blinkeyit",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return response.json({
      message: "check your mail",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(request,response){
    try{
        const {email , otp}=request.body
        if(!email||!otp){
            return response.status(400).json({
                message:"provide email and otp both.",
                error:true,
                success:false
            })
        }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({
        message: "Invalid email address",
        error: true,
        success: false,
      });
    }
    //we will verify weather the mail entered exists in the data base or not

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "email id not registered!!",
        error: true,
        success: false,
      });
    }
    const currentTime =new Date();
    if(user.forgot_password_expiry<currentTime){
        return response.status(400).json({
            message:"otp time expired!",
            error:true,
            succes:false
        })
    }
    if(otp!==user.forgot_password_otp){
     return response.status(400).json({
        message:"Invalid Otp",
        error:true,
        success:false
     })
    }
    const updateUser =await UserModel.findByIdAndUpdate(user?._id,{
      forgot_password_otp:"",
      forgot_password_expiry:"",
    })
    //if otp is not expired and otp === user.forgot_password_otp
    return response.json({
        message:"otp verified successfully",
        error:false,
        success:true
    })

    }
    catch(error){
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
export async function resetpassword(request,response){
    try{
    const {email,newPassword,confirmPassword}=request.body
    if(!email){
        return response.status(400).json({
        message:"enter email",
        error:true,
        success:false
        })
    }
    if(!newPassword){
        return response.status(400).json({
        message:"enter newPassword",
        error:true,
        success:false
        })
    }
    if(!confirmPassword){
        return response.status(400).json({
        message:"enter confirmPassword",
        error:true,
        success:false
        })
    }
    if(!email||!newPassword||!confirmPassword){
        return response.status(400).json({
        message:"enter all the required feilds",
        error:true,
        success:false    
        })
    }

    const user =await UserModel.findOne({email})
    if(!user){
    return response.status(400).json({
        message:"email is not registered",
        error:true,
        success:false    
        })   
    }
    if(newPassword!==confirmPassword){
        return response.status(400).json({
        message:"confirm password and new password are different",
        error:true,
        success:false    
        })   
    }
    const salt =await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(newPassword,salt)
    const update = await UserModel.findOneAndUpdate(user._id,{
      password:hashPassword
    })
   return response.json({
    message:"password updated successfully",
    error:false,
    success:true
   })

    }
    catch(error){
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}

export async function refreshToken(request, response) {
  try {
    const refreshToken = request.cookies.refreshToken || request.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return response.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }

    console.log("refreshToken:", refreshToken);
    const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

    if (!verifyToken) {
      return response.status(401).json({
        message: "Token expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken.id; // Fixed: should be verifyToken.id not verifyToken?._id
    const newAccessToken = await generatedAccessToken(userId);
    
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
      message: "Access token refreshed successfully",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userDetails(request,response) {
  try{
    const userId=request.userId
    console.log(userId)
    const user = await UserModel.findById(userId).select('-password -refresh_token');

    return response.json({
      data:user,
      error:false,
      success:true
    })
  }
  catch(error){
  return response.status(500).json({
    message:"something is wrong",
    error:true,
    success:false
  })
  }
}

