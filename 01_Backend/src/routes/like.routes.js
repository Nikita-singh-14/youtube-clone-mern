import { Router } from "express";
import { getLikedVideos, toggelCommentLike, toggelTweetLike, toggelVideoLike } from "../controllers/like.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/video-like/:videoId").patch(jwtVerify, toggelVideoLike)
router.route("/comment-like/:commentId").patch(jwtVerify, toggelCommentLike)
router.route("/tweet-like/:tweetId").patch(jwtVerify, toggelTweetLike)
router.route("/liked-video").get(jwtVerify, getLikedVideos)
export default router