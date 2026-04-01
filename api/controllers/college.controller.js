import { College } from "../model/collegeSchema.js";

export const createCollge = async (req, res, next) => {
  try {
    const { collegeName, address } = req.body;
    if (!collegeName || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const college = await College.create({
      collegeName,
      address,
      admin: req.user.id,
    });
    return res.status(201).json({
      message: "college created successfully",
      college: college,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
