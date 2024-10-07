import dotenv from "dotenv";
dotenv.config();

export const port = process.env.SERVER_PORT || 5050;

export const hostname = "127.0.0.1";

export const node_env = process.env.NODE_ENV || "development";

export const mongoURL = process.env.MONGODB_URI;

export const clinetWhiteList = process.env.CLIENT_WHITE_LIST?.split(",");

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const accessTokenExpire = "15d";
export const accessCookiemaxAge = 1000 * 60 * 60 * 24 * 15; // 15 days

export const refreshTokenExpire = "365d";
export const refreshCookiemaxAge = 1000 * 60 * 60 * 24 * 70; // 70 daysys

export const allowedImageTypes = ["jpg", "jpeg", "png", "webp"];

export const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
export const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
export const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;

export const strip_secret_key = process.env.STRIP_SECRET_KEY;

// check
export const jwtRegisterSecretKey = process.env.JWT_REGISTER_KEY;
export const jwtRegisterKeyExpire = "1d";

export const passwordResetKey = process.env.PASSWORD_RESET_KEY;
export const passwordResetKeyExpire = "10m";

export const smtpHost = process.env.SMTP_HOST;
export const smtpPort = process.env.SMTP_PORT;
export const emailUser = process.env.EMAIL_HOST_USER;
export const emailPass = process.env.EMAIL_HOST_PASSWORD;

export const clientURL = process.env.CLIENT_URL;

export const userImageUploadDir = "public/images/users";
export const userMaxImageSize = 400000;
export const defaultUserImagePath = "public/images/default/default_user.webp";
export const categoryImageUploadDir = "public/images/categories";
export const defaultCatImagePath =
  "public/images/default/default_category.webp";
export const defaultBrandImagePath = "public/images/default/default_brand.webp";
export const brandImageUploadDir = "public/images/brands";
export const productImageUploadDir = "public/images/products";
