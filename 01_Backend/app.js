import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGINS,
//     credentials:true,
// }))

const allowedOrigins = process.env.CORS_ORIGINS.split(",")

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser());


import userRouter from './src/routes/user.routes.js'
import videoRouter from './src/routes/video.routes.js'
import subscriptionRouter from './src/routes/subscription.routes.js'
import tweetRouter from './src/routes/tweet.routes.js'
import likeRouter from './src/routes/like.routes.js'
import commentRouter from './src/routes/comment.routes.js'
import playlistRouter from './src/routes/playlist.routes.js'
import dashboardRouter from './src/routes/dashboard.routes.js'
import healthcheckRouter from './src/routes/healthcheck.routes.js'


app.use('/api/v1/healthcheck', healthcheckRouter)
app.use('/api/v1/user', userRouter);
app.use('/api/v1/video', videoRouter);
app.use('/api/v1/subscription', subscriptionRouter)
app.use('/api/v1/like', likeRouter);
app.use('/api/v1/tweet', tweetRouter);
app.use('/api/v1/playlist', playlistRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/dashboard', dashboardRouter)

export default app