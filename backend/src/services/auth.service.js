import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * @function
 * @description Hashes the password and saves a new user to the database.
 * @param {Object} userData - The user data containing username, email, and password.
 * @returns {Object} Response message for user creation.
 */
export const registerUser = async ({ username, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return { message: "User created successfully" };
  } catch (err) {
    throw new Error("Failed to create user!");
  }
};

/**
 * @function
 * @description Verifies user credentials and generates a JWT token.
 * @param {Object} credentials - The user credentials containing username and password.
 * @returns {Object} Token and user data for successful login.
 */
export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });

  if (!user) throw { status: 400, message: "Invalid Credentials!" };

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw { status: 400, message: "Invalid Credentials!" };

  // Generate JWT Token
  const token = jwt.sign({ id: user._id,  username:user.username  }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  return { token, user: {  username: user.username } };
};
