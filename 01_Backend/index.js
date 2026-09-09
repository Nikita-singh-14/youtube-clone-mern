import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {DB_NAME} from './constants.js';
import connectDB from './src/db/index.js';
//01-sept 2026
// import "dotenv/config";
import app from './app.js'

dotenv.config({
    path: './.env'
});

const Port = process.env.PORT || 8000
//app.use() => when we want to use middleware
connectDB()
.then(()=>{
    app.on("ERROR", (error) =>{
        console.log("ERROR:", error)
    })
    app.listen(Port, () => {
        console.log(`App is running at port : ${Port}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed:", error);
    throw error
})














/*
import express from'express';
const app = express();

( async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR:", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }catch(err){
        console.log("ERROR:", err);
        throw error;
    }
} )()

*/