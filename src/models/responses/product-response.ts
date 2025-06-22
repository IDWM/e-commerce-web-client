import { PaginationResponse, Product, ProductCondition } from '@/models';

export interface ProductsWithPaginationResponse {
  products: Product[];
  pagination: PaginationResponse;
}

export interface ProductFiltersResponse {
  brands: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
  conditions: ProductCondition[];
}
