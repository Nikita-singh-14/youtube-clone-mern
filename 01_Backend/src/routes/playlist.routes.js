import { Router } from "express";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js"


const router = Router();

router.route("/create").post(jwtVerify, createPlaylist)
router.route("/delete/:playlistId").delete(jwtVerify, deletePlaylist)
router.route("/update/:playlistId").patch(jwtVerify, updatePlaylist)
router.route("/add-video/:playlistId/:videoId").patch(jwtVerify, addVideoToPlaylist)


router.route("/playlist-id/:playlistId").get(jwtVerify, getPlaylistById)
router.route("/user-playlist/:userId").get(jwtVerify, getUserPlaylists)
router.route("/remove-video").delete(jwtVerify, removeVideoFromPlaylist)


export default router