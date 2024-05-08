import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: req.currentUser.id },
      });
      if (!roles.includes(user?.role)) {
        throw new NotAuthorizedError("You are not authorized to perform this action.");
      }
      next();
    } catch (err) {
      next(err.message);
    }
  };
};