import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { BadRequestError } from "../errors/bad-request-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password } = req.body;

      if (!name || !password) {
        throw new BadRequestError('Missing information')
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { name } });

      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!user || !isPasswordValid) {
        throw new BadRequestError('Invalid credentials')
      }
      delete user.password;
      const token = encrypt.generateToken({ id: user.id });

      req.session.jwt = token;

      return res.status(200).send({ jwt: token, success: true });
    } catch (error) {
      next(error)
    }
  }
  static async logout(req: Request, res: Response, next: NextFunction) {
    req.session = null;

    res.send({ success: true });
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.currentUser.id) {
        throw new NotAuthorizedError();
      }
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: req.currentUser.id },
      });
      const { password, ...safeUser } = user;
      return res.status(200).json({ user: safeUser, success: true });
    } catch (err) {
      next(err)
    }

  }
}
