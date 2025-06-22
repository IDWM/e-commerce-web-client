import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import {
  PaginationResponse,
  Product,
  ProductFiltersResponse,
  ProductParamsRequest,
} from '@/models';

interface ProductStore {
  products: Product[];
  pagination: PaginationResponse;
  availableFilters: ProductFiltersResponse;
  filters: ProductParamsRequest;

  setProducts: (products: Product[], pagination: PaginationResponse) => void;
  setAvailableFilters: (filters: ProductFiltersResponse) => void;
  updateFilters: (filters: Partial<ProductParamsRequest>) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  initializeFromUrl: (urlParams: Partial<ProductParamsRequest>) => void;
}

const defaultFilters: ProductParamsRequest = {
  pageNumber: 1,
  pageSize: 12,
  orderBy: undefined,
  search: undefined,
  brands: undefined,
  categories: undefined,
  condition: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

const defaultPagination: PaginationResponse = {
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  pageSize: 12,
};

const defaultAvailableFilters: ProductFiltersResponse = {
  brands: [],
  categories: [],
  minPrice: 0,
  maxPrice: 0,
  conditions: [],
};

const filtersChanged = (
  oldFilters: ProductParamsRequest,
  newFilters: Partial<ProductParamsRequest>,
): boolean => {
  const mergedFilters = { ...oldFilters, ...newFilters };

  const keys: (keyof ProductParamsRequest)[] = [
    'pageNumber',
    'pageSize',
    'orderBy',
    'search',
    'brands',
    'categories',
    'condition',
    'minPrice',
    'maxPrice',
  ];

  return keys.some((key) => {
    const oldValue = oldFilters[key];
    const newValue = mergedFilters[key];

    if (Array.isArray(oldValue) && Array.isArray(newValue)) {
      return (
        oldValue.length !== newValue.length ||
        !oldValue.every((val, index) => val === newValue[index])
      );
    }

    return oldValue !== newValue;
  });
};

export const useProductStore = create<ProductStore>()(
  subscribeWithSelector((set, _get) => ({
    products: [],
    pagination: defaultPagination,
    availableFilters: defaultAvailableFilters,
    filters: defaultFilters,

    setProducts: (products, pagination) => set({ products, pagination }),

    setAvailableFilters: (availableFilters) => set({ availableFilters }),

    updateFilters: (newFilters) =>
      set((state) => {
        if (!filtersChanged(state.filters, newFilters)) {
          return state;
        }

        return {
          filters: {
            ...state.filters,
            ...newFilters,
            pageNumber: 1,
          },
        };
      }),

    clearFilters: () => set({ filters: { ...defaultFilters } }),

    setPage: (pageNumber) =>
      set((state) => {
        if (state.filters.pageNumber === pageNumber) {
          return state;
        }

        return {
          filters: { ...state.filters, pageNumber },
        };
      }),

    setPageSize: (pageSize) =>
      set((state) => {
        if (state.filters.pageSize === pageSize) {
          return state;
        }

        return {
          filters: { ...state.filters, pageSize, pageNumber: 1 },
        };
      }),

    initializeFromUrl: (urlParams) =>
      set((state) => {
        if (!filtersChanged(state.filters, urlParams)) {
          return state;
        }

        return {
          filters: { ...state.filters, ...urlParams },
        };
      }),
  })),
);
