import { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { Product } from '../models/Product';

const API_URL = 'products';

interface ProductResponse {
  data: Product[];
}

const getProducts = async (): Promise<ProductResponse | undefined> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.log(error, 'errror')
    console.error('Error fetching products:', error);
  }
};

const createProduct = async (data: Product): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/products`, data);
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

const updateProduct = async (id: string, data: Product): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/update/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

const deleteProduct = async (id: string): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/delete/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};