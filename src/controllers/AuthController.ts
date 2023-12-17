import { Request, Response, NextFunction } from "express";
import { LoginService, RegisterService } from "../services";
import { generateAccessToken } from "../utils/jwt";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, phone_number, password, confirm_password } = req.body;

    const user = await RegisterService({ email, name, phone_number, password, confirm_password });

    return res.status(201).json({
      code: 201,
      status: "success",
      message: "User created",
      data: {
        user
      }
    });
  } catch (error) {
    next(error)
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await LoginService({ email, password });
    const token = generateAccessToken(user.id);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "User logged in",
      data: {
        access_token: token
      }
    });
  } catch (error) {
    next(error)
  }
}