import { Scoreboard } from "../models/scoreboard.model.js";
 
/**
 * Updates the scoreboard if the provided score is the user's highest.
 * @param {String} userId - The ID of the user.
 * @param {Number} score - The new score to potentially update.
 */
export async function updateScoreboard(userId,username, score) {
  try {
    // Check if the user's current score is the highest on record
    const existingEntry = await Scoreboard.findOne({ userId });
 
    if (!existingEntry || score > existingEntry.score) {
      // If no entry or the new score is higher, update the scoreboard
      await Scoreboard.updateOne(
        { userId },
        { $set: { username, score, updatedAt: new Date() } }, // Fix here
        { upsert: true }
      );
    }
  } catch (error) {
    console.error("Error updating scoreboard:", error);
  }
}
 
export async function recalculateRanks() {
  try {
    // Fetch all scores sorted by score in descending order
    const allScores = await Scoreboard.find({}) // Query using Scoreboard model
      .sort({ score: -1 }) // Sort by score in descending order
      .exec(); // Ensure to execute the query
 
   
 
    // Update each user's rank
    for (let i = 0; i < allScores.length; i++) {
      const userId = allScores[i].userId;
      const rank = i + 1; // Rank is i + 1 (because index starts from 0)
      console.log(allScores.length);
 
      // Update the rank field for each user
      await Scoreboard.updateOne(
        { userId }, // Find the user by userId
        { $set: { rank } } // Set the rank field
      );
    }
    console.log("All Scores:", allScores);
  } catch (error) {
    console.error("Failed to recalculate ranks:", error);
  }
}

// Function to retrieve user info by userId
export const getUserInfoById = async (userId) => {
    try {
      // Find the user's latest score entry
      const userScore = await Scoreboard.findOne({ userId }).sort({ updatedAt: -1 });
  
      // If user data is not found, return null
      if (!userScore) {
        return null;
      }
  
      // Count the total number of entries for the given userId to get the number of games played
      const gamesPlayed = await Scoreboard.countDocuments({ userId });
  
      // Return an object with the user's info
      return {
        username: userScore.username,
        rank: userScore.rank,
        score: userScore.score,
        gamesPlayed,
      };
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };