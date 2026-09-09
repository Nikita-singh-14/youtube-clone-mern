import { Router } from "express";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/channel/:channelId/videos").get(jwtVerify, getChannelVideos)
router.route("/channel/:channelId/stats").get(jwtVerify, getChannelStats)


export default router