import createError from "http-errors";
import { clinetWhiteList } from "../app/secret.mjs";

// whitelist is an array of url's that are allowed to access the api
var whitelist = clinetWhiteList;

// corsOptions is an object with a function that checks if the origin is in the whitelist
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(createError(401, "Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

// export the corsOptions object
export default corsOptions;
