import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product.entity";
import { OrderProduct } from "../entity/OrderProducts.entity";
import { Order } from "../entity/Order.entity";
import { NotFoundError } from "../errors/not-found-error";

export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();
    return res.status(200).json({
      data: products,
    });

  }
  static async createProduct(req: Request, res: Response) {
    const { name, brand, price } =
      req.body;
    const product = new Product();
    product.name = name;
    product.brand = brand;
    product.price = price;

    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.save(product);
    return res
      .status(200)
      .json({ message: "Product created successfully", product });
  }

  static async updateProduct(req: Request, res: Response) {
    const { id } = req.params;

    const { name, brand, price } =
      req.body;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: { id },
    });
    product.name = name;
    product.brand = brand;
    product.price = price;
    await productRepository.save(product);
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    const orderProductRepository = AppDataSource.getRepository(OrderProduct);
    const orderRepository = AppDataSource.getRepository(Order);

    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError();
    }

    const associatedOrderProducts = await orderProductRepository.find({
      where: { product: { id } },
      relations: ['order'],
    });

    for (const orderProduct of associatedOrderProducts) {
      const order = orderProduct.order;
      order.total_price -= parseFloat(product.price);
      await orderRepository.save(order);

      await orderProductRepository.remove(orderProduct);
    }

    await productRepository.remove(product);

    return res
      .status(200)
      .json({ message: 'Product deleted successfully', product });
  }
}