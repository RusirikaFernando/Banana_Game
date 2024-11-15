import express from "express";
 
import { submitscore } from "../controllers/score.controller.js";
//import {getUserProfile} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUserInfo } from "../controllers/user.controller.js";

 
const router = express.Router();
 
router.post("/add-score",verifyToken, submitscore);
router.get("/user-info",verifyToken, getUserInfo);
 
export default router;