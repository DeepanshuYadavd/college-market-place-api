import { Auth } from "../model/auth.schema.js";
import { genToken } from "../../utils/genToken.js";
export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
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

    const token = await genToken(user._id);

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
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
