import { createHash } from "crypto";

const hashPassword = (input: string): string => {
  let password = createHash("sha256").update(input).digest("hex");
  return password;
};

const verifyPassword = async (
  inputPassword: string,
  storedHashedPassword: string
): Promise<boolean> => {
  const HashedPassword = hashPassword(inputPassword);
  return HashedPassword === storedHashedPassword;
};

const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export { isValidEmail, verifyPassword, hashPassword };
