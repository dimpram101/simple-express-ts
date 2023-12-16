import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../models/ErrorModel";

export const errorHandler = (err: Error | ErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.code || 500).json({
      code: err.code,
      status: "error",
      tag: err.tag,
      message: err.message,
    });
  }

  return res.status(500).json({
    code: 500,
    status: 'error',
    tag: null,
    message: 'Internal server error: ' + err.message || 'Unknown error',
  });
};