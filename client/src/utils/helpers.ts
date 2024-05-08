import { Product } from "../models/Product";

export const authHeader = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};
export const handleProductObj = (product: Product | null) => {
  const newProduct: Product = {
    id: '',
    name: '',
    brand: '',
    price: 0,
  };
  if (product) {
    newProduct.name = product.name;
    newProduct.brand = product.brand;
    newProduct.price = product.price;
  }
  return newProduct;
}
