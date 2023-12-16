import { NextFunction, Request, Response } from "express";
import { ErrorResponse, TokenModel } from "../models";
import jwt from "jsonwebtoken";

export const checkSelfEditing = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ErrorResponse(401, ["token"], "Unauthorized");
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        throw new ErrorResponse(401, ["token"], "Unauthorized");
      }

      if (decoded) {
        const { userId } = decoded as TokenModel;
        
        if (Number(userId) !== Number(req.params.id)) {
          throw new ErrorResponse(403, ["token"], "Forbidden, you don't have rights to edit this user");
        }

        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
