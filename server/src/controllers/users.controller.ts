import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { BadRequestError } from "../errors/bad-request-error";
import { Order } from "../entity/Order.entity";

export class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password, address, payment } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({
        where: { name },
      });

      if (existingUser) {
        throw new BadRequestError('Name in use');
      }

      const encryptedPassword = await encrypt.encryptpass(password);

      const user = new User();
      user.name = name;
      user.password = encryptedPassword;
      user.address = address;
      user.payment = payment;

      const order = new Order();
      order.total_price = 0;
      user.orders = [];
      user.orders.push(order);

      await userRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });

      req.session = {
        jwt: token,
      };

      return res.status(200).json({ jwt: token, success: true });
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find({ select: ['id', 'name', 'address', 'payment', 'role', 'createdAt', 'updatedAt'] });

      return res.status(200).json({
        data: users,
        success: true
      });

    } catch (error) {
      console.error("Error retrieving users:", error.message);
      next()
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    let user = await userRepository.findOne({
      where: { id },
    });

    user = {
      ...user,
      ...req.body
    }
    await userRepository.save(user);
    res.status(200).json({ message: "udpdate", user, success: true });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ success: true });
  }
}
