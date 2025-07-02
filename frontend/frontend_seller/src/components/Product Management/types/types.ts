export interface Category {
  id: string;
  name: string;
  // description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  price: string;
}

export interface CategoryFormData {
  name: string;
  // description: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  image: string;
  price: string;
}