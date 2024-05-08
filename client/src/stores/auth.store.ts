import { makeAutoObservable, runInAction } from 'mobx';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import { User } from '../models/User';
import { newUser } from '../components/common/types';

class AuthStore {
  user: User | null = null;
  isLoading = false;
  isLoggedIn = false;
  errorMessage = '';

  constructor(initialState = {}) {
    Object.assign(this, initialState);
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
    this.isLoggedIn = true;
    this.errorMessage = '';
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string) {
    this.errorMessage = error;
  }

  async handleUser(jwt: string) {
    try {
      if (!jwt) {
        throw new Error('Failed to authenticate');
      }

      localStorage.setItem('jwt', jwt);
      const res = await AuthService.getCurrentUser();

      if (!res?.user) {
        throw new Error('Failed to get user');
      }

      runInAction(() => {
        this.setUser(res?.user);
        this.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('An error occurred while getting user');
      });
    }
  }

  async login(username: string, password: string) {
    try {
      this.setLoading(true);
      const data = await AuthService.login(username, password);
      await this.handleUser(data.jwt);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('Failed to authenticate');
      });
    }
  }

  async register(formData: newUser) {
    try {
      this.setLoading(true);
      const data = await UserService.register(formData);
      await this.handleUser(data?.jwt);
    } catch (error) {
      runInAction(() => {
        this.setLoading(false);
        this.setError('Failed to create user');
      });
    }
  }

  logout() {
    AuthService.logout();
    this.user = null;
    this.isLoggedIn = false;
  }
}

export default AuthStore;
