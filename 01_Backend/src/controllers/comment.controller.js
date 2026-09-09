import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getVideoComment = asyncHandler(async(req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(
            400,
            "Video ID is required"
        )
    }

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(
            400,
            "Invalid video ID"
        )
    }

    const videoExists = await Video.exists({_id: videoId})
    if (!videoExists) {
        throw new ApiError(
            404,
            "Video does not exist"
        )
    }

    const comments = await Comment.find({
        video: videoId
    })
        .populate("owner", "username fullName avatar")
        .sort({ createdAt: -1 })

    return res.status(200).json(
        new ApiResponse(
            200,
            comments,
            "Video comments fetched successfully"
        )
    )
})

const addComment = asyncHandler(async(req, res) => {
    const {content, video} = req.body
    if(!content || content?.trim() === ''){
        throw new ApiError(400, "please write something to add comment")
    }
    if(!video || !mongoose.isValidObjectId(video)){
        throw new ApiError(400, "please enter valid video id")
    }
    const videoExists = await Video.findById(video)

    if (!videoExists) {
        throw new ApiError(
            404,
            "Video does not exist"
        )
    }
    const comment = await Comment.create({
        content,
        video,
        owner: req.user?._id
    })

    return res.status(200).json(new ApiResponse(200, comment, "Add comment successfully"))
})

const updateComment = asyncHandler(async(req, res) => {
    const {content} = req.body;
    const {commentId} = req.params;
    if(!commentId){
        throw new ApiError(400, "comment id is required")
    }

    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(404, "comment does not exit")
    }
    if(!content){
        throw new ApiError(400, "please write something to add comment")
    }
    if(content.trim() === ''){
        throw new ApiError(400, "content should not be empty")
    }

    const comment = await Comment.findOneAndUpdate(
        {
            _id: commentId,
            owner: req.user?._id
        },
        {
            $set: {
                content: content.trim()
            }
        },
        {
            new: true
        }
    )

    if (!comment) {
        throw new ApiError(
            404,
            "Comment does not exist"
        )
    }

    return res.status(200).json(new ApiResponse(200, comment, "update comment successfully"))
})

const deleteComment = asyncHandler(async(req, res) => {
    const {commentId} = req.params
    if(!commentId){
        throw new ApiError(400, "comment id is required")
    }

    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(404, "comment does not exit")
    }

    const comment = await Comment.findByIdAndDelete(commentId)
    if (!comment) {
        throw new ApiError(
            404,
            "Comment does not exist"
        )
    }

    return res.status(200).json(new ApiResponse(200, comment, "comment deleted successfully"))

})

export {getVideoComment, addComment, deleteComment, updateComment}