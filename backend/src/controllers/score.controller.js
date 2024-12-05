import { addUserScore } from "../services/userscore.service.js";
import scoreEvents  from "../events/scoreboard.events.js"
 
 
export async function submitscore(req,res) {
 
    const { score, date } = req.body;

    if (typeof score !== "number" || score < 0) {
        return res.status(400).json({ error: "Invalid score data" });
      }
    
    try {
        await addUserScore(req.userId, req.username,score,date);
        scoreEvents.emit("scoreSubmitted", req.userId, req.username, score);
         res.status(200).json({ message: "Score submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit scoreq" });
    }
   
}