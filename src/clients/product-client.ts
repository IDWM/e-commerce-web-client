import { axiosClient } from '@/clients';
import {
  ApiResponse,
  PaginationResponse,
  Product,
  ProductFiltersResponse,
  ProductParamsRequest,
  ProductsWithPaginationResponse,
} from '@/models';

export const productClient = {
  getProducts: async (
    params: ProductParamsRequest,
  ): Promise<ApiResponse<ProductsWithPaginationResponse>> => {
    const searchParams = new URLSearchParams();

    searchParams.append('pageNumber', params.pageNumber.toString());
    searchParams.append('pageSize', params.pageSize.toString());

    if (params.orderBy) searchParams.append('orderBy', params.orderBy);
    if (params.search) searchParams.append('search', params.search);
    if (params.brands) searchParams.append('brands', params.brands);
    if (params.categories) searchParams.append('categories', params.categories);
    if (params.condition !== undefined)
      searchParams.append('conditions', params.condition.toString());
    if (params.minPrice !== undefined) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) searchParams.append('maxPrice', params.maxPrice.toString());

    const response = await axiosClient.get<ApiResponse<Product[]>>(
      `/product?${searchParams.toString()}`,
    );

    const paginationHeader = response.headers['pagination'];
    let pagination: PaginationResponse = {
      totalCount: 0,
      pageSize: params.pageSize,
      currentPage: params.pageNumber,
      totalPages: 0,
    };

    if (paginationHeader) {
      try {
        pagination = JSON.parse(paginationHeader);
      } catch {}
    }

    return {
      data: {
        products: response.data.data ?? [],
        pagination: pagination,
      },
      success: response.data.success,
      message: response.data.message,
      errors: response.data.errors,
    };
  },

  getProductFilters: async (): Promise<ApiResponse<ProductFiltersResponse>> => {
    const response = await axiosClient.get<ApiResponse<ProductFiltersResponse>>('/product/filters');

    return response.data;
  },
};
