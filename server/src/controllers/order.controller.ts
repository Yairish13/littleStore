import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { Product } from "../entity/Product.entity";
import { OrderProduct } from "../entity/OrderProducts.entity";
import { Order } from "../entity/Order.entity";
import { BadRequestError } from "../errors/bad-request-error";

const getActiveOrderForUser = async (user: User) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
        where: { user: { id: user.id } },
    });
    if (!order) {
        const newOrder = new Order();
        newOrder.user = user;
        newOrder.total_price = 0;
        return await orderRepository.save(newOrder);
    }

    return order;
};

const getOrderProduct = async (order: Order, product: Product, quantity: number) => {
    const orderProductRepository = AppDataSource.getRepository(OrderProduct);
    const orderProducts = await orderProductRepository.findOne({
        where: { order: { id: order.id }, product: { id: product.id } },
    });
    if (!quantity || quantity == 0) {
        orderProductRepository.delete(orderProducts.id);
        return;
    }
    return orderProducts;
};

export class orderController {
    static async associateProductToUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, productId, quantity } = req.body;

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new BadRequestError("User not found");
            }

            const order = await getActiveOrderForUser(user);

            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOne({ where: { id: productId } });
            if (!product) {
                throw new BadRequestError("Product not found");
            }

            let orderProduct = await getOrderProduct(order, product, quantity);

            if (!orderProduct && quantity) {
                orderProduct = new OrderProduct();
                orderProduct.order = order;
                orderProduct.product = product;
                orderProduct.quantity = quantity;
                order.total_price = Number(order.total_price) + (Number(product.price));
            }

            if (!orderProduct) {
                order.total_price = Number(order.total_price) - (Number(product.price));
            }

            await AppDataSource.transaction(async (transactionalEntityManager) => {
                if (orderProduct) await transactionalEntityManager.save(orderProduct);
                await transactionalEntityManager.save(order);
            });

            res.status(200).json({ message: "Product associated successfully" });
        } catch (error) {
            console.error(error);
            next();
        }
    }
    static async getAllProductsForUser(req: Request, res: Response, next: NextFunction) {
        try {

            const userId = req.params.userId;

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId }, relations: ["orders"] });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (user.orders.length === 0) {
                const order = new Order();
                order.total_price = 0;
                user.orders.push(order);
            }

            const orderId = user.orders[0].id;

            const orderProductRepository = AppDataSource.getRepository(OrderProduct);
            const orderProducts = !orderId ? [] : await orderProductRepository.find({
                where: {
                    order: {
                        id: orderId,
                    },
                },
                relations: ["product"],
            });

            const products = Array.from(new Set(orderProducts.map(orderProduct => orderProduct.product)));
            let { password, ...safeUser } = user;
            const userWithProducts = {
                ...safeUser,
                products
            }
            res.status(200).json(userWithProducts);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

}