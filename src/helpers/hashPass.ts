import bcrypt from "bcryptjs";
export const hashPassWord = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
