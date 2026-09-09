import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getVideoComment, updateComment } from "../controllers/comment.controller.js";

const router = Router();

router.route("/add-comment").post(jwtVerify, addComment)
router.route("/video-comment/:videoId").get(jwtVerify, getVideoComment)
router.route("/update/:commentId").patch(jwtVerify, updateComment)
router.route("/delete/:commentId").delete(jwtVerify, deleteComment)

export default router