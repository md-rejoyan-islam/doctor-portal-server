import express from "express";
import { authorization } from "../../middlewares/authorization.mjs";
import { userMulter } from "../../middlewares/multer.mjs";
import {
  userPasswordUpdateValidator,
  userRegisterValidator,
  userResetPasswordValidator,
} from "../../middlewares/validators/file/user.validator.mjs";
import runValidation from "../../middlewares/validators/validation.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";
import {
  banUserById,
  createUser,
  deleteUserById,
  findUserById,
  forgotPasswordByEmail,
  getAllUsers,
  makeAdminById,
  resetPassword,
  roleChange,
  unbanUserById,
  updatePasswordById,
  updateUserById,
} from "../controllers/user.controllers.mjs";

const userRouter = express.Router();

const moduleRoutes = [
  {
    path: "/",
    method: "get",
    middleware: [isLoggedIn, authorization("admin")],
    route: getAllUsers,
  },
  {
    path: "/",
    method: "post",
    middleware: [
      isLoggedIn,
      authorization("admin"),
      userRegisterValidator,
      runValidation,
    ],
    route: createUser,
  },
  {
    path: "/ban-user/:id([0-9a-fA-F]{24})",
    method: "patch",
    middleware: [isLoggedIn, authorization("admin")],
    route: banUserById,
  },
  {
    path: "/unban-user/:id([0-9a-fA-F]{24})",
    method: "patch",
    middleware: [isLoggedIn, authorization("admin")],
    route: unbanUserById,
  },
  {
    path: "/update-password/:id([0-9a-fA-F]{24})",
    method: "patch",
    middleware: [
      isLoggedIn,
      userPasswordUpdateValidator,
      runValidation,
      authorization("admin", "user", "seller"),
    ],
    route: updatePasswordById,
  },
  {
    path: "/forgot-password/:email",
    method: "get",
    middleware: [isLoggedIn, authorization("admin", "user", "seller")],
    route: forgotPasswordByEmail,
  },
  {
    path: "/make-admin/:id([0-9a-fA-F]{24})",
    method: "patch",
    middleware: [isLoggedIn, authorization("admin")],
    route: makeAdminById,
  },
  {
    path: "/role-change/:id([0-9a-fA-F]{24})",
    method: "patch",
    middleware: [isLoggedIn, authorization("admin")],
    route: roleChange,
  },
  {
    path: "/reset-password",
    method: "patch",
    middleware: [
      isLoggedIn,
      userResetPasswordValidator,
      runValidation,
      authorization("admin", "user", "seller"),
    ],
    route: resetPassword,
  },
  {
    path: "/:id([0-9a-fA-F]{24})",
    method: "get",
    middleware: [isLoggedIn, authorization("admin", "user", "seller")],
    route: findUserById,
  },
  {
    path: "/:id([0-9a-fA-F]{24})",
    method: "delete",
    middleware: [isLoggedIn, authorization("admin", "user", "seller")],
    route: deleteUserById,
  },
  {
    path: "/:id([0-9a-fA-F]{24})",
    method: "patch",
    middleware: [
      isLoggedIn,
      userMulter,
      authorization("admin", "user", "seller"),
    ],
    route: updateUserById,
  },
];

moduleRoutes.forEach((route) => {
  userRouter[route.method](route.path, route.middleware, route.route);
});

export default userRouter;
