export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  email: string;
}

export interface Order {
  id: string;
  products: Product[];
  customer: Customer;
  status: 'Pending' | 'Accepted' | 'Canceled';
  createdAt: Date;
}