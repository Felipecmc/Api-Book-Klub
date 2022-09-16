import { Response } from "express";

export class AppError extends Error {
  statusCode;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (error: AppError, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: (error as any).message,
  });
};
