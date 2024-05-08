import { autorun, makeAutoObservable } from 'mobx';
import AuthStore from './auth.store';
import UserStore from './user.store';
import ProductStore from './product.store';

class RootStore {
    authStore: AuthStore;
    userStore: UserStore;
    productStore: ProductStore;

    constructor() {
        this.authStore = new AuthStore(this.loadState('authStore'));
        this.userStore = new UserStore(this.loadState('userStore'));
        this.productStore = new ProductStore(this.loadState('productStore'));
        makeAutoObservable(this);
    }

    saveState = (key: string) => {
        let state: string = '';
        switch (key) {
            case 'userStore':
                state = JSON.stringify(this.userStore);
                break;
            case 'authStore':
                state = JSON.stringify(this.authStore);
                break;
            case 'productStore':
                state = JSON.stringify(this.productStore);
                break;
            default:
                break;
        }
        sessionStorage.setItem(key, state);
    }

    loadState = (key: string) => {
        const state = sessionStorage.getItem(key);
        return state ? JSON.parse(state) : {};
    }
    
    clearSession = () => {
        sessionStorage.removeItem('authStore');
        sessionStorage.removeItem('userStore');
        sessionStorage.removeItem('productStore');
    }
}

const rootStore = new RootStore();

autorun(() => rootStore.saveState('authStore'));
autorun(() => rootStore.saveState('userStore'));
autorun(() => rootStore.saveState('productStore'));

export default rootStore;
