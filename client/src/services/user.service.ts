import { AxiosResponse } from 'axios';
import { newUser } from '../components/common/types';
import { User } from '../models/User';
import axiosInstance from '../utils/axiosInstance';

const API_URL = 'users';
const API_URL_ORDERS = 'orders';

interface Associate {
  userId: string;
  productId: string;
  quantity: number
}

const register = async (formData: newUser) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/signup`, formData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const getUsers = async (): Promise<AxiosResponse> => {
  try {
    const res = await axiosInstance.get(`${API_URL}`);
    return res;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserById = async (id: string): Promise<AxiosResponse> => {
  try {
    return await axiosInstance.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

const updateUser = async (id: string, data: User): Promise<AxiosResponse> => {
  try {
    return await axiosInstance.post(`${API_URL}/update/${id}`, data);
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

const getAllAssociatedProducts = async (userId: string): Promise<AxiosResponse> => {
  try {
    return await axiosInstance.get(`${API_URL_ORDERS}/products/${userId}`, {});
  } catch (error) {
    console.error(`Error get products with user ID ${userId}:`, error);
    throw error;
  }
};
const associateProduct = async (associateObj: Associate): Promise<AxiosResponse> => {
  try {
    return await axiosInstance.post(`${API_URL_ORDERS}/addProduct`, associateObj);
  } catch (error) {
    console.error(`Error associating product with user ID ${associateObj.userId}:`, error);
    throw error;
  }
};

export default {
  register,
  getUsers,
  getUserById,
  updateUser,
  associateProduct,
  getAllAssociatedProducts
};
