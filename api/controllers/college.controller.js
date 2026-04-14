import { College } from "../model/college.schema.js";

export const createCollge = async (req, res, next) => {
  try {
    const { collegeName, address } = req.body;
    if (!collegeName || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // case : 1 only one admin create one college
    const isAdminExist = await College.findOne({ admin: req.user.id });

    if (isAdminExist) {
      return res.status(400).json({
        message: "Admin can create only one college",
      });
    }

    //  case 2 : two admin can not create one (same) college
    const isCollegeExist = await College.findOne({ collegeName: collegeName });

    if (isCollegeExist) {
      return res.status(400).json({
        message: "College is already exist",
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


//  product controller , cloudnary setup
