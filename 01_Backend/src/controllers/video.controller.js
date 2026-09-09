// https://github.com/hiteshchoudhary/chai-backend/blob/main/src/controllers/video.controller.js

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import mongoose from "mongoose";

const videoUpload = asyncHandler(async (req, res) => {

    const { title, description } = req.body
    if (!title?.trim()) {
        throw new ApiError(401, "title is required")
    }

    console.log(req.body)

    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
    const videoLocalPath = req.files?.videofile?.[0]?.path;


    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required")
    }

    const thumbnail = thumbnailLocalPath ? await uploadOnCloudinary(thumbnailLocalPath) : '';
    const videofile = await uploadOnCloudinary(videoLocalPath);

    

    const video = await Video.create({
        title,
        description,
        thumbnail: thumbnail?.url || '',
        videofile: videofile.url,
        duration: videofile.duration,
        views: 0,
        isPublished: true,
        owner: req.user._id
    });

    // console.log(video)

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video file uploaded Successfully")
        )


})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(400, "video id is required")
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(400, "video not found")
    }
    return res.status(200)
        .json(new ApiResponse(200, video, "fechted video successfully"))
})

const updateVideoInfo = asyncHandler(async (req, res) => {

    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "video Id is required")
    }

    const { title, description } = req.body
    const thumbnailLocalPath = req.file?.path

    const updateData = {}

    if (title !== undefined) {
        updateData.title = title
    }
    if (description !== undefined) {
        updateData.description = description
    }
    if (thumbnailLocalPath) {
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
        if (!thumbnail.url) {
            throw new ApiError(400, "Error while uploading on thumbnail")
        }
        updateData.thumbnail = thumbnail.url
    }

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "At least one feild is required to update")
    }


    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: updateData
        },
        { new: true }
    )

    if (!video) {
        throw new ApiError(500, "video not found")
    }

    return res.status(200)
        .json(new ApiResponse(200, video, "video updated successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "please enter valid video id")
    }

    // const videoIdFound = Video.findById(videoId)
    // if (!videoIdFound) {
    //     throw new ApiError(400, "please enter valid video id")
    // }

    const video = await Video.findByIdAndDelete(videoId)
    // const video = await Video.findByIdAndDelete(videoIdFound)

    if (!video) {
        throw new ApiError(400, "video not found")
    }

    return res.status(200).json(new ApiResponse(200, video, "video deleted successfully"))

})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400, "video does not exit")
    }

    video.isPublished = !video.isPublished
    await video.save()
    return res.status(200).json(new ApiResponse(200, "publish status toggled succefully"))
})

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy="createdAt", sortType="desc", userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    // page → which page the user wants
    // limit → number of videos per page
    // query → search text
    // sortBy → field to sort on
    // sortType → ascending/descending
    // userId → filter videos by a particular user

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {}
    filter.isPublished = true;

    if (query) {
        filter.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: "i" } },
        ]
    }

    if (userId) {
        filter.owner = userId;
    }

    const sortOrder = sortType === "asc" ? 1 : -1;
    const sort = {
        [sortBy]: sortOrder
    }

    const videos = await Video.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)

    const totalVideos = await Video.countDocuments(filter);
    const totalPages = Math.ceil(totalVideos / limitNumber);
    const hasNextPage = pageNumber < totalPages
    const hasPreviousPage = pageNumber > 1

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                videos,
                pagination: {
                    currentPage: pageNumber,
                    limit: limitNumber,
                    totalVideos,
                    totalPages,
                    hasNextPage,
                    hasPreviousPage
                }
            },
            "Videos fetched successfully"
        )
    )
})


export { videoUpload, getVideoById, updateVideoInfo, deleteVideo, togglePublishStatus, getAllVideos }