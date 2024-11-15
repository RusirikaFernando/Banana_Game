// controllers/user.controller.js
import { getUserInfoById } from "../services/scoreboard.service.js";

// Controller function to handle getting user info by userId
export const getUserInfo = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const userInfo = await getUserInfoById(userId);

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user info" });
  }
};

