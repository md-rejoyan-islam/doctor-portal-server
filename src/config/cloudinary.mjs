import { v2 as cloudinary } from "cloudinary";
import {
  cloudinary_api_key,
  cloudinary_api_secret,
  cloudinary_cloud_name,
} from "../app/secret.mjs";

// email :rejoyanislam***14@gmail.com
cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
  secure: true,
});

export default cloudinary;
