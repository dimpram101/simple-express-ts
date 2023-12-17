import { NextFunction, Request, Response } from "express";
import {
  CreateRoleService,
  DeleteRoleService,
  EditRoleService,
  GetAllRolesService,
} from "../services";

export const GetAllRolesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await GetAllRolesService();

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Roles retrieved",
      data: {
        roles,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const CreateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const role = await CreateRoleService(name as string);

    return res.status(201).json({
      code: 201,
      status: "success",
      message: "Role created",
      data: {
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const EditRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await EditRoleService(parseInt(id), name as string);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Role updated",
      data: {
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await DeleteRoleService(parseInt(id));

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Role deleted",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
