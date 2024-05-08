import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from '../components/Users/UserList';
import UserDetails from '../components/Users/UserDetails';
import UserCart from '../components/Users/UserCart';
import RootStore from '../stores/root.store';

interface UsersPageProps {
    rootStore: typeof RootStore
}
const UsersPage: React.FC<UsersPageProps> = ({ rootStore }) => {
    useEffect(() => {
        rootStore.userStore.fetchUsers();
      }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<UserList rootStore={rootStore} />} />
                <Route path="/:id" element={<UserDetails rootStore={rootStore} />} />
                <Route path="/:id/cart" element={<UserCart rootStore={rootStore} />} />
            </Routes>
        </div>
    );
};

export default UsersPage;