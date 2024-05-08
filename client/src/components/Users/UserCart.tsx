import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import RootStore from '../../stores/root.store';
import ProductList from '../Products/ProductList';

interface UserCartProps {
    rootStore: typeof RootStore;
}

const UserCart: FC<UserCartProps> = observer(({ rootStore }) => {
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            rootStore.userStore.fetchUserProductsById(id);
        }
    }, [id]);

    const handleRemoveFromCart = (productId: string) => {
        const userId = id ? id : rootStore?.userStore?.currentUser?.id;
        if (userId) rootStore.userStore.associateProduct(userId, productId, 0);
    };

    return (
        <div>
            <h2>User Cart</h2>
            {rootStore.userStore.isLoading ? (
                <p>Loading...</p>
            ) : rootStore.userStore.currentUser && (
                <div>
                    <p>name: {rootStore.userStore?.currentUser.name}</p>
                    <p>Delivery Address: {rootStore.userStore?.currentUser.address}</p>
                    <p>Payment Method: {rootStore.userStore?.currentUser.payment}</p>
                    <p>total cart: {rootStore.userStore?.currentUser?.orders && rootStore.userStore?.currentUser?.orders[0].total_price}</p>
                    <ProductList
                        products={rootStore.userStore.currentUser.products || []}
                        onRemoveFromCart={handleRemoveFromCart}
                        rootStore={rootStore}
                        isCartView={true}
                    />
                </div>
            )}
        </div>
    );
});

export default UserCart;
