import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../models";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ErrorResponse(401, ["token"], "Unauthorized");
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, _decoded) => {
      if (err) {
        throw new ErrorResponse(401, ["token"], "Token expired");
      }

      next()
    });
  } catch (error) {
    next(error);
  }
};
