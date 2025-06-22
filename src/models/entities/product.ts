export enum ProductCondition {
  NEW = 0,
  OLD = 1,
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  urls?: string[];
  stock: number;
  brand: string;
  publicId?: string;
  isActive: boolean;
  condition: ProductCondition;
}
