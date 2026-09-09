import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";

const router = Router();

router.route("/user-tweet/:userId").get(jwtVerify, getUserTweets)
router.route("/create").post(jwtVerify, createTweet)
router.route("/update/:tweetId").patch(jwtVerify, updateTweet)
router.route("/delete/:tweetId").delete(jwtVerify, deleteTweet)

export default router