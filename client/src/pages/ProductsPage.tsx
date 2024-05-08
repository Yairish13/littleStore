import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import ProductFilters from '../components/Products/ProductFilters';
import Modal from '../components/Modal/Modal';
import rootStore from '../stores/root.store';
import { Product } from '../models/Product';
import { handleProductObj } from '../utils/helpers'
import './ProductPage.css'

interface Filters {
    brandFilter: string;
    nameFilter: string;
    minPrice: number;
    maxPrice: number;
}

const ProductsPage: React.FC = observer(() => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filters, setFilters] = useState<Filters>({
        brandFilter: '',
        nameFilter: '',
        minPrice: 0,
        maxPrice: Infinity,
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        rootStore.productStore.fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setShowModal(true);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleDeleteProduct = (id: string | undefined) => {
        if (id) rootStore.productStore.deleteProduct(id);
    };

    const handleFilter = (filters: Filters) => {
        setFilters(filters);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredProducts = rootStore.productStore.products.filter((product) => {
        const { brandFilter, nameFilter, minPrice, maxPrice } = filters;
        const matchesBrand =
            brandFilter === '' || product.brand.toLowerCase().includes(brandFilter.toLowerCase());
        const matchesName =
            nameFilter === '' || product.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);

        return matchesBrand && matchesName && matchesPrice && matchesSearch;
    });

    const handleProductSubmit = (product: Product | null) => {
        if (product && product.id) {
            rootStore.productStore.updateProduct(product.id, product);
        } else {
            const newProduct = handleProductObj(product);
            rootStore.productStore.createProduct(newProduct);
        }
        setShowModal(false);
    };

    const handleOnAddToCart = (userId: string, productId: string) => {
        rootStore.userStore.associateProduct(userId, productId, 1)
    }
    return (
        <div>
            <ProductFilters onFilter={handleFilter} />
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={handleSearch} />
            <ProductList
                rootStore={rootStore}
                products={filteredProducts}
                onAddProduct={handleAddProduct}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
                onAddToCart={handleOnAddToCart}
            />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ProductForm product={selectedProduct} onSubmit={handleProductSubmit} onClose={() => setShowModal(false)} />
            </Modal>
        </div>
    );
});

export default ProductsPage;
