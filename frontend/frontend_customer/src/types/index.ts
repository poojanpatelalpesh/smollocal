export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // Added category
}

export interface CartItem {
  product: Product;
  quantity: number;
}