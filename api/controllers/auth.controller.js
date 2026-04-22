import { Auth } from "../model/auth.schema.js";
import { genToken } from "../../utils/genToken.js";
import { College } from "../model/college.schema.js";
export const signup = async (req, res, next) => {
  try {
    const { userName, email, password, college, isVerified, role } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isUserExist = await Auth.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: "Email is already exist",
      });
    }
    const user = await Auth.create({
      userName,
      email,
      password,
      college,
      isVerified,
      role,
    });

    return res.status(201).json({
      id: user._id,
      message: "User Registered Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "password is incorrect",
      });
    }

    //  check isverified
    if (user.isVerified === false) {
      return res.status(400).json({
        message: "You can sign in once the admin has verified you.",
      });
    }

    const token = await genToken(
      user._id,
      user.role,
      user.college ? user.college : null,
    );

    if (!token) {
      return res.status(400).json({
        message: "Token is not found",
      });
    }
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "signin successfully",
        id: user._id,
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//  get all user for admin:
export const getAllusers = async (req, res, next) => {
  try {
    const college = await College.findOne({ admin: req.user.id });
    const users = await Auth.find({
      role: "user",
      college: college._id,
    }).select("-password");
    if (!users && users.length === 0) {
      return res.status(400).json({
        message: "No Users Found",
      });
    }
    return res.status(200).json({
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//  update user isVerified true by admin:

export const getUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      message: "Signout successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//  get user of particular college for admin:

//  delete user by admin:
