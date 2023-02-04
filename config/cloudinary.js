import {v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Api_Key,
    api_secret:process.env.Api_Secret
});
// instance of cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats:["jpeg", "jpg", "png"],
    params:{
        folder: "forum-api",
        transformation:[{width:200, height:200, crop:"limit"}]
    }
});
export default storage;

