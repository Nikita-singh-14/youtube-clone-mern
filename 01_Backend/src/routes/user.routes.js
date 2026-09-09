import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changePassword, 
    getCurrentUser, 
    updateDetails, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory 
} from "../controllers/register.controller.js";
import {upload} from "../middleware/multer.middleware.js"
import { jwtVerify } from "../middleware/auth.middleware.js";
const router = Router()

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), 
registerUser
)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(jwtVerify, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(jwtVerify, changePassword)
router.route("/current-user").get(jwtVerify, getCurrentUser)
router.route("/update-details").patch(jwtVerify, updateDetails)
router.route("/avatar").patch(jwtVerify, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(jwtVerify, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(getUserChannelProfile)
router.route("/watch-history").get(jwtVerify, getWatchHistory)

export default router