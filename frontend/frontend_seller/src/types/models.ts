export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  email: string;
}

export interface Order {
  uuid: string; // ✅ Unique identifier for React key, actions, etc.
  products: Product[];
  customer: Customer;
  status: 'Pending' | 'Accepted' | 'Canceled';
  createdAt: Date;
}
