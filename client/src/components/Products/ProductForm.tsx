import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import { Product } from '../../models/Product';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Product | null) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
    } else {
      setName('');
      setBrand('');
      setPrice(0);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSubmit({ ...product, name, brand, price });
    } else {
      onSubmit({ id: '', name, brand, price, quantity: 1 });
    }
    onClose();
  };

  return (
    <div className="product-form-container">
      <h2 className="product-form-title">{product ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button primary">{product ? 'Save' : 'Add'}</button>
          <button type="button" onClick={onClose} className="form-button secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
