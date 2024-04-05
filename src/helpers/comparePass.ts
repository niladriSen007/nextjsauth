import bcrypt from "bcryptjs";
export const comparePass = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
