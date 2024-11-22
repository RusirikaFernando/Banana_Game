import { registerUser, loginUser } from "../services/auth.service.js";

/**
 * @function
 * @description Registers a new user by delegating to the service.
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send back the results.
 * @returns {void}
 */
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await registerUser({ username, email, password });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to create user!" });
  }
};

/**
 * @function
 * @description Logs in a user by delegating to the service.
 * @param {Object} req - The request object containing username and password.
 * @param {Object} res - The response object to send back the results.
 * @returns {void}
 */
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginUser({ username, password });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .status(200)
      .json({ message: "Login Successful", user });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

/**
 * @function
 * @description Logs out a user by clearing the JWT cookie.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the results.
 * @returns {void}
 */
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
