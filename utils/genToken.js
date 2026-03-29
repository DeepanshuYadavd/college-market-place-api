import jwt from "jsonwebtoken";

export const genToken = async (id) => {
  return await jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
