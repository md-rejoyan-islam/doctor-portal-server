import asyncHandler from "express-async-handler";
import fs from "fs";
fs.promises;
import checkMongoID from "../../helper/checkMongoId.mjs";
import { successResponse } from "../../helper/responseHandler.mjs";
import deleteImage from "../../helper/deleteImage.mjs";
import {
  banUserByIdService,
  createUserService,
  deleteUserByIdService,
  findUserByIdService,
  forgotPasswordByEmailService,
  getAllUsersService,
  resetPasswordService,
  unbanUserByIdService,
  updateUserByIdService,
  updateUserPasswordByIdService,
} from "../services/user.service.mjs";
import userModel from "../../models/user.model.mjs";

/**
 *
 * @apiDescription    Get All Register User Data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/users
 * @apiAccess          Private ( Authenticated Role )
 *
 * @apiParams         [ page = number ]     default page = 1
 * @apiParams         [ limit = number ]    min = 1, default = 10
 * @apiParams         [ search query ]
 *
 *
 * @apiSuccess        { success : true , message, pagination , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   No Brand data found
 *
 */

export const getAllUsers = asyncHandler(async (req, res) => {
  // search query fields
  const searchFields = ["name", "email", "phone"];

  // default page and limit value
  req.query.page = Number(req.query.page) || 1;
  req.query.limit = Number(req.query.limit) || 10;

  // find users data and add links
  const { users, pagination } = await getAllUsersService(req, searchFields);

  // response
  return successResponse(res, {
    statusCode: 200,
    message: "User data fetched successfully",
    payload: {
      pagination,
      data: users,
    },
  });
});

// make admin
export const makeAdminById = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // update user
  const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
    $set: {
      role: "admin",
    },
  });

  if (!updatedUser) {
    throw createError(404, "Could not find any user.");
  }

  // response
  successResponse(res, {
    statusCode: 200,
    message: "User role updated to admin successfully",
    payload: {
      data: updatedUser,
    },
  });
});

// change role
export const roleChange = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // update user
  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        role: req.body.role,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw createError(404, "Could not find any user.");
  }
  // response
  successResponse(res, {
    statusCode: 200,
    message: "User role changed successfully",
    payload: {
      data: updatedUser,
    },
  });
});

/**
 *
 * @apiDescription    Find User By ID
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/users/:id
 * @apiAccess          Private ( Authenticated Role )
 *
 * @apiParams         [ ID ]
 *
 * @apiSuccess        { success : true , message, data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   No Brand data found
 *
 */

export const findUserById = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // find user
  const user = await findUserByIdService(req.params.id);

  // response
  successResponse(res, {
    statusCode: 200,
    message: "Single user data fetched successfully",
    payload: {
      data: user,
    },
  });
});

// create user
// only admin can create user
export const createUser = asyncHandler(async (req, res) => {
  // validate user
  const user = await createUserService(req.body);

  // response send
  successResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    payload: {
      data: user,
    },
  });
});

// update user
export const updateUserById = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // buffer image
  // if (req.file) {
  //   req.body.photo = req.file.buffer.toString("base64");
  // }

  // some data remove from update
  ["role", "isAdmin", "isBanned", "_id", "createdAt", "updatedAt"].forEach(
    (field) => delete req.body[field]
  );

  // update options
  const options = {
    $set: {
      ...req.body,
      photo: req.file && req.file.path,
    },
  };
  // update user
  const updatedUser = await updateUserByIdService(req.params.id, options);

  // delete previous image
  if (req.file && updatedUser.photo) {
    deleteImage(updatedUser.photo);
  }

  // response
  successResponse(res, {
    statusCode: 200,
    message: "User data updated successfully",
    payload: {
      data: updatedUser,
    },
  });
});

// delete user
export const deleteUserById = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // delete user
  const deletedUser = await deleteUserByIdService(req.params.id);

  // // image delete
  const userImagePath = deletedUser?.photo;

  userImagePath && deleteImage(userImagePath);

  // response send
  return successResponse(res, {
    statusCode: 200,
    message: "User deleted successfully",
    payload: {
      data: deletedUser,
    },
  });
});

// ban user by id
export const banUserById = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // update user
  const updatedUser = await banUserByIdService(req.params.id);

  // response
  successResponse(res, {
    statusCode: 200,
    message: "User banned successfully",
    payload: {
      data: updatedUser,
    },
  });
});

// unban user by id
export const unbanUserById = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // update user
  const updatedUser = await unbanUserByIdService(req.params.id);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "User unbanned successfully",
    payload: {
      data: updatedUser,
    },
  });
});

// update password
export const updatePasswordById = asyncHandler(async (req, res) => {
  // id validation
  checkMongoID(req.params.id);

  // update option
  const options = {
    oldPassword: req.body.oldPassword,
    $set: {
      password: req.body.newPassword,
    },
  };

  // update password
  const updatedUser = await updateUserPasswordByIdService(
    req.params.id,
    options
  );

  // response
  successResponse(res, {
    statusCode: 200,
    message: "Password updated successfully",
    payload: {
      data: updatedUser,
    },
  });
});

// forgot password
export const forgotPasswordByEmail = asyncHandler(async (req, res) => {
  // email
  const { email } = req.params;

  // forgot password reset token
  const resetToken = await forgotPasswordByEmailService(email);

  // response send
  successResponse(res, {
    statusCode: 200,
    message: `A password reset email sent to ${email}, To reset password please verify.`,
    payload: {
      resetToken,
    },
  });
});

// reset password
export const resetPassword = asyncHandler(async (req, res) => {
  // reset token
  const { resetToken } = req.body;

  // update password
  const updatedUser = await resetPasswordService(resetToken, req.body);

  // response
  successResponse(res, {
    statusCode: 200,
    message: "Password reset successfully",
    payload: {
      data: updatedUser,
    },
  });
});
