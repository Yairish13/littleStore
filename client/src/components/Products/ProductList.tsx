import React from 'react';
import { Product } from '../../models/Product';
import './ProductList.css';
import RootStore from '../../stores/root.store';
import { Link } from 'react-router-dom';

interface ProductListProps {
  products: Product[];
  onAddProduct?: () => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (id: string | undefined) => void;
  onAddToCart?: (userId: string, productId: string) => void;
  onRemoveFromCart?: (productId: string) => void;
  rootStore: typeof RootStore;
  isCartView?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddProduct,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
  rootStore,
  isCartView,
  onRemoveFromCart,
}) => {
  const isLoggedIn = rootStore.authStore.isLoggedIn;
  const userId = rootStore.authStore.user?.id;

  const handleAddToCart = (productId: string) => {
    if (onAddToCart && userId) {
      onAddToCart(userId, productId);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    if (onRemoveFromCart) {
      onRemoveFromCart(productId);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (onDeleteProduct) {
      onDeleteProduct(productId);
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Products</h2>
        {isLoggedIn && onAddProduct && (
          <button onClick={onAddProduct} className="add-product-button">
            Add Product
          </button>
        )}
      </div>
      <ul className="product-list">
        {products.length > 0 ? products.map((product, index) => (
          <li key={index} className="product-item">
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <p>Price: ${product.price}</p>
            </div>
            {isLoggedIn && (
              <div className="product-actions">
                {!isCartView && (
                  <button
                    onClick={() => handleAddToCart(product.id || '')}
                    className="add-button"
                  >
                    Add
                  </button>
                )}
                {!isCartView && (
                  <button onClick={() => onEditProduct && onEditProduct(product)} className="edit-button">
                    Edit
                  </button>
                )}
                {(
                  <button
                    onClick={() => (onRemoveFromCart ? handleRemoveFromCart(product.id || '') : handleDeleteProduct(product.id || ''))}
                    className="delete-button"
                  >
                    {isCartView ? 'Remove' : 'Delete'}
                  </button>
                )}
              </div>
            )}
          </li>
        )) : (
          <>
            Looks like you have no products, 
            <Link to="/">
              lets go.
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
