import { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { User } from '../models/User';

const API_URL = 'auth';
interface AuthResponse {
  jwt: string;
  user: User;
}
interface LoginResponse {
  jwt: string;
}
const login = async (name: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, {
      name,
      password,
    });

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const logout = async (): Promise<AxiosResponse> => {
  try {
    localStorage.removeItem('user');
    return await axiosInstance.post(`${API_URL}/logout`);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

const getCurrentUser = async (): Promise<AuthResponse  | undefined> => {
  try {
    const response = await axiosInstance.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

export default {
  login,
  logout,
  getCurrentUser,
};
