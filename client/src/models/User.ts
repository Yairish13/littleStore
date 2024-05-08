import { Product } from "./Product";

interface Order {
  id: string;
  total_price: string;
  created_at: string;
}
export interface User {
  id?: string | undefined;
  name: string;
  address: string;
  payment: 'credit' | 'cash';
  products?: Product[];
  orders?: Order[] | undefined;
}




