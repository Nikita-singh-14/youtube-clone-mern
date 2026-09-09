import mongoose, { Aggregate } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import {Tweet} from "../models/tweet.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const toggelVideoLike = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    if(!videoId){
        throw new ApiError(400, "video Id does not exit")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400, "please enter valid video id")
    }
    
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404, "video does not exit")
    }

    const existVideoLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    })

    if(existVideoLike){
        await Like.findByIdAndDelete(existVideoLike._id)
        return res.status(200)
        .json(new ApiResponse(200, null, "Video unLike"))
    }

    const like = await Like.create({
        video: videoId,
        likedBy: req.user._id
    })
    if(!like){
        throw new ApiError(500, "something went wrong while liking the video")
    }

    return res.status(200).json(new ApiResponse(200, like, "video like successfully"))
})

const toggelCommentLike = asyncHandler(async(req, res) => {
    const { commentId } = req.params

     if(!commentId){
        throw new ApiError(400, "comment Id does not exit")
    }
    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(400, "please enter valid comment id")
    }
    
    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404, "comment does not exit")
    }

    const existCommentLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    })

    if(existCommentLike){
        await Like.findByIdAndDelete(existCommentLike._id)
        return res.status(200)
        .json(new ApiResponse(200, null, "Comment unLike"))
    }

    const commentLike = await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })

    return res.status(200).json(new ApiResponse(200, commentLike, "comment like successfully"))

})

const toggelTweetLike = asyncHandler(async(req, res) => {
    const {tweetId} = req.params
    if(!tweetId){
        throw new ApiError(400, "Tweet Id does not exit")
    }
    if(!mongoose.isValidObjectId(tweetId)){
        throw new ApiError(400, "please enter valid Tweett id")
    }
    
    const tweet = await Tweet.findById(tweetId)
    if(!tweet){
        throw new ApiError(400, "Tweet does not exit")
    }

    const existTweetLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    })

    if(existTweetLike){
        await Like.findByIdAndDelete(existTweetLike._id)
        return res.status(200)
        .json(new ApiResponse(200, null, "Tweet unLike"))
    }

    const tweetLike = await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    })

    return res.status(200).json(new ApiResponse(200, tweetLike, "Tweet like successfully"))
})

const getLikedVideos = asyncHandler(async(req, res) => {
    const likedVideo = await Like.aggregate([
        {
            $match:{
                likedBy: new mongoose.Types.ObjectId(req.user._id),
                video: { $ne: null }
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"video",
                foreignField:"_id",
                as:"likedVideo"
            }
        },
        {
            $unwind: "$likedVideo"
        },
        {
            $replaceRoot: {
                newRoot: "$likedVideo"
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, likedVideo, "Fetched all likes videos"))
})

export {toggelVideoLike, toggelCommentLike, toggelTweetLike, getLikedVideos}