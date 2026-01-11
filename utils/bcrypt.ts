import bcrypt from "bcryptjs";

export const hashPassword = async (p: string) => {
  return await bcrypt.hash(p, 12);
};

export const verifyPassword = async (p: string, h: string) => {
  return await bcrypt.compare(p, h);
};

