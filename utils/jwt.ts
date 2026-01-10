import jwt from "jsonwebtoken";

export const signJWT = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
