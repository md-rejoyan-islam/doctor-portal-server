import express from "express";
import {
  activateUserAccount,
  googleLogin,
  logout,
  me,
  refreshToken,
  userLogin,
  userRegister,
} from "../controllers/auth.controllers.mjs";
import limiter from "../../middlewares/rateLimiter.mjs";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../../middlewares/validators/file/user.validator.mjs";
import runValidation from "../../middlewares/validators/validation.mjs";
import { isLoggedIn, isLoggedOut } from "../../middlewares/verify.mjs";

//create router
const authRouter = express.Router();

authRouter.route("/register").post(
  // limiter(50), // 5 requests per minute
  // isLoggedOut,
  // userRegisterValidator,
  // runValidation,
  userRegister
);

// signInWithGoogle
authRouter.route("/google-login").post(isLoggedOut, googleLogin);

authRouter.route("/activate").post(activateUserAccount);
authRouter.route("/login").post(
  limiter(5),
  /* 5 requests per minute*/
  isLoggedOut,
  userLoginValidator,
  runValidation,
  userLogin
);
authRouter.route("/refresh-token").get(refreshToken);
authRouter.route("/logout").post(isLoggedIn, logout);
authRouter.route("/me").get(isLoggedIn, me);

//export
export default authRouter;
