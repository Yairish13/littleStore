import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User.entity';
import { Product } from '../entity/Product.entity';

interface BulkData {
    users: Partial<User>[];
    products: Partial<Product>[];
}

export class BulkController {
    static async createBulkData(req: Request, res: Response, next: NextFunction) {
        try {
            const { users, products }: BulkData = req.body;

            const userRepository = AppDataSource.getRepository(User);
            const createdUsers = await userRepository.create(users);
            await userRepository.save(createdUsers);

            const productRepository = AppDataSource.getRepository(Product);
            const createdProducts = await productRepository.create(products);
            await productRepository.save(createdProducts);
        } catch (err) {
            next(err);
        }
    }

    static async fetchAndCreateBulkData(req: Request, res: Response, next: NextFunction) {
        try {
            const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');

            const users = usersResponse.data.map((user: any) => ({
                name: user.name,
                password: 'defaultPassword',
                address: user.address.street + ', ' + user.address.city,
                payment: 'credit',
                role: user.id === 5 ? 'admin' : 'user'
            }));

            const { data } = await axios.get('https://dummyjson.com/products?limit=10');

            const products = data.products.map((product: any) => ({
                name: product.title || "product",
                brand: product.brand,
                price: product.price.toString(),
            }));

            const bulkData: BulkData = { users, products };
            await BulkController.createBulkData({ body: bulkData } as Request, res, next);
        } catch (err) {
            next(err);
        }
    }
}