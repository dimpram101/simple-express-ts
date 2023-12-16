import { NextFunction, Request, Response } from "express";
import {
  UpdatePasswordService,
  deleteUserService,
  editUserService,
  getUserByIdService,
} from "../services/UserService";

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdService(id);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "User found",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const editUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await editUserService(id, req.body);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "User updated",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteUserService(id);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "User deleted",
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

export const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    await UpdatePasswordService(id, req.body);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Password updated",
    });
  } catch (error) {
    next(error);
  }
};
