import type { Request, Response, NextFunction } from "express";

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const catchAsync = (fn: AsyncController) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
