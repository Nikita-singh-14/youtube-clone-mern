import mongoose from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        throw new ApiError(400, "User ID is required")
    }

    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }
    const userTweets = await Tweet.find({
        owner: userId
    }).sort({ createdAt: -1 })

    return res.status(200)
        .json(new ApiResponse(200, userTweets, "get all tweets of this user"))
})

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body
    if (!content || !content.trim()) {
        throw new ApiError(400, "content is required")
    }


    const tweet = await Tweet.create({
        content: content.trim(),
        owner: req.user?._id
    })

    if (!tweet) {
        throw new ApiError(400, "something went wrong while creating tweet")
    }

    return res.status(201)
        .json(new ApiResponse(201, tweet, "tweet created successfully"))
})

const updateTweet = asyncHandler(async (req, res) => {
    const { content } = req.body
    const { tweetId } = req.params
    if (!tweetId) {
        throw new ApiError(400, "tweet id is required")
    }
    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId")
    }
    if (!content) {
        throw new ApiError(400, "content is required")
    }
    if (content.trim() === undefined) {
        throw new ApiError(400, "content can not be empty")
    }

    const tweet = await Tweet.findOneAndUpdate(
        {
            owner: req.user?._id,
            _id: tweetId
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

    if (!tweet) {
        throw new ApiError(500, "something went wrong while creating tweet")
    }

    return res.status(200)
        .json(new ApiResponse(200, tweet, "tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!tweetId) {
        throw new ApiError(400, "tweet id is required")
    }
    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId")
    }

    const tweet = await Tweet.findOneAndDelete({
        _id: tweetId,
        owner: req.user?._id
    })
    if (!tweet) {
        throw new ApiError(500, "something went wrong while deleteing tweet")
    }

    return res.status(200)
        .json(new ApiResponse(200, tweet, "tweet deleted successfully"))
})

export { getUserTweets, createTweet, updateTweet, deleteTweet }