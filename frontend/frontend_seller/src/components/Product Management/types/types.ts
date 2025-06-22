export interface Category {
  _id: string;
  name: string;
  seller: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  seller: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image?: File;
}