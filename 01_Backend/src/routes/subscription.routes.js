import { Router } from "express";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/toggle/:channelId").patch(jwtVerify, toggleSubscription)
router.route("/subscribers/:channelId").get(jwtVerify, getUserChannelSubscribers)
router.route("/subscribed-channels/:subscriberId").get(jwtVerify, getSubscribedChannels)

export default router