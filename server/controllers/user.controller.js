import { User } from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { generateToken } from "../utills/generateToken.js";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../utills/cloudinary.js";
import { sendEmail } from "../utills/sendEmail.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.staus(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exist",
        success: false,
      });
    }
    const hashPassword = await bycrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error, "register controller error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist",
        success: false,
      });
    }
    const isPasswordMatch = await bycrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "password is incorrect",
        success: false,
      });
    }
    generateToken(res, user, `Welcome ${user.name}`);
  } catch (error) {
    console.log(error, "login controller error");
  }
};
export const logOut = async (_, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Required for Vercel + Render (HTTPS)
      sameSite: "None", // Important when frontend & backend are on different domains
    });
  } catch (error) {
    console.log("logout error", error);
    return res.status(500).json({
      success: false,
      message: "failed to logout",
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolled");

    if (!user) {
      return res.status(400).json({
        message: "profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log("getUserProfile error", error);
    return res.status(500).json({
      success: false,
      message: "failed to load user",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    // extract public id of the old image from the url is it exists;
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
      deleteMediaFromCloudinary(publicId);
    }
    //upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log("update profile error", error);
    return res.status(500).json({
      success: false,
      message: "failed to update user",
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate Reset Token (valid for 15 minutes)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    // Reset Link
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send Email
    await sendEmail(
      email,
      "Password Reset Request",
      `Hi ${user.name},\n\nClick the link below to reset your password:\n${resetURL}\n\nThis link is valid for 15 minutes.\n\nBest regards,\nYour App Team`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("forgotPassword error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash New Password
    const hashedPassword = await bycrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log("resetPassword error:", error);
    return res.status(500).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
