import { makeAutoObservable, runInAction } from 'mobx';
import ProductService from '../services/product.service';
import { Product } from '../models/Product';

class ProductStore {
    products: Product[] = [];
    isLoading = false;
    errorMessage = '';

    constructor(initialState = {}) {
        Object.assign(this, initialState);
        makeAutoObservable(this);
    }

    setProducts(products: Product[]) {
        this.products = products;
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    setError(error: string) {
        this.errorMessage = error;
    }

    async fetchProducts() {
        this.setLoading(true);
        try {
            const response = await ProductService.getProducts();

            runInAction(() => {
                if(response){
                    this.setProducts(response.data);
                    this.setLoading(false);
                }else{
                    this.setError('Failed fetch products')
                }
            });
        } catch (error) {
            runInAction(() => {
                this.setLoading(false);
                this.setError('Failed fetch products');
            });
        }
    }

    async createProduct(data: Product) {
        this.setLoading(true);
        try {
            await ProductService.createProduct(data);
            await this.fetchProducts();
        } catch (error) {
            runInAction(() => {
                this.setLoading(false);
                this.setError('Failed create product');
            });
        }
    }

    async updateProduct(id: string, data: Product) {
        this.setLoading(true);
        try {
            await ProductService.updateProduct(id, data);
            await this.fetchProducts();
        } catch (error) {
            runInAction(() => {
                this.setLoading(false);
                this.setError('failed to update product');
            });
        }
    }

    async deleteProduct(id: string) {
        this.setLoading(true);
        try {
            await ProductService.deleteProduct(id);
            await this.fetchProducts();
        } catch (error) {
            runInAction(() => {
                this.setLoading(false);
                this.setError('failed delete product');
            });
        }
    }
}

export default ProductStore;
