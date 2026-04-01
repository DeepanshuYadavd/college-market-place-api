import jwt from "jsonwebtoken";

export const genToken = async (id, role) => {
  return await jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
