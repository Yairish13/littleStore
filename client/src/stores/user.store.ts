import { makeAutoObservable, runInAction } from 'mobx';
import UserService from '../services/user.service';
import { User } from '../models/User';

class UserStore {
  users: User[] = [];
  currentUser: User | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(initialState = {}) {
    Object.assign(this, initialState);
    makeAutoObservable(this);
  }

  setUsers(users: User[]) {
    this.users = users;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string) {
    this.errorMessage = error;
  }

  async fetchUsers() {
    try {
      this.setLoading(true);

      const response = await UserService.getUsers();
      runInAction(() => {
        this.setUsers(response.data.data);
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('An error occurred');
      });
    }
  }

  async fetchUserProductsById(id: string) {
    try {
      this.setLoading(true);
      const response = await UserService.getAllAssociatedProducts(id);

      runInAction(() => {
        this.setCurrentUser(response.data);
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('An error occurred');
      });
    }
  }

  async updateUser(id: string, data: User) {
    try {
      this.setLoading(true);
      await UserService.updateUser(id, data);
      await this.fetchUsers();
      this.setLoading(false);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('An error occurred');
      });
    }
  }

  async associateProduct(userId: string, productId: string, quantity: number) {
    try {
      this.setLoading(true);
      await UserService.associateProduct({ userId, productId, quantity });
      await this.fetchUserProductsById(userId);
      this.setLoading(false);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('An error occurred');
      });
    }
  }

  async dissociateProduct(userId: string, productId: string) {
    try {
      this.setLoading(true);
      await UserService.associateProduct({ userId, productId, quantity: 0 });
      await this.fetchUserProductsById(userId);
      this.setLoading(false);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('An error occurred');
      });
    }
  }
}

export default UserStore;
