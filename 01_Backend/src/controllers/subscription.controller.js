import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if(!channelId){
        throw new ApiError(400, "channel Id is not found")
    }
    const existingSubscription = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId
    })

    if(existingSubscription){
        await Subscription.findByIdAndDelete(existingSubscription._id)

        return res.status(200)
        .json(new ApiResponse(200, null, "unSubscribe successfully"))
    }
    const subscription = await Subscription.create({
        subscriber: req.user._id,
        channel: channelId
    })
    return res.status(200)
        .json(new ApiResponse(200, subscription, "Subscribe successfully"))
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    if(!channelId){
        throw new ApiError(400, "channel Id is not found")
    }

    const subscribers = await Subscription.find({
        channel: channelId
    }).populate(
        "subscriber",
        "username fullName avatar"
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscribers,
                "Channel subscribers fetched successfully"
            )
        )

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if (!subscriberId) {
        throw new ApiError(400, "Subscriber ID is required")
    }

    const subscribedChannels = await Subscription.find({
        subscriber: subscriberId
    }).populate(
        "channel",
        "username fullName avatar"
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscribedChannels,
                "Subscribed channels fetched successfully"
            )
        )
})

export {getSubscribedChannels, getUserChannelSubscribers, toggleSubscription}