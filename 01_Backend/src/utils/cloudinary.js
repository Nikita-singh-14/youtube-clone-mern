import dotenv from 'dotenv';
dotenv.config();
import {v2 as cloudinary} from 'cloudinary';
import fs, { unlinkSync } from 'fs'



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});





const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        });
        //file has been uploaded successfull
        // console.log("file is uploaded on cloudinary",
        //     response.url
        // );
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.log("Cloudinary Error:", error);
        if (localFilePath && fs.existsSync(localFilePath)) { 
            fs.unlinkSync(localFilePath); 
        }
        // fs.unlinkSync(localFilePath) //remove the locally saved temorary file as the upload operatio got failed
        return null;
    }
}

export {uploadOnCloudinary}