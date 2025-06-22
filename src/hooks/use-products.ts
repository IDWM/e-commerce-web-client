'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { convertFormToParams, convertParamsToForm, convertUrlToParams } from '@/libs';
import { ProductFiltersForm, productFiltersSchema, ProductParamsRequest } from '@/models';
import { useGetProductFilters, useGetProducts } from '@/services';
import { useProductStore } from '@/stores';

export const useProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initializedFromUrl = useRef(false);
  const isUpdatingUrl = useRef(false);

  const {
    products,
    pagination,
    availableFilters,
    filters,
    setProducts,
    setAvailableFilters,
    updateFilters,
    clearFilters,
    setPage,
    setPageSize,
    initializeFromUrl,
  } = useProductStore();

  const productsQuery = useGetProducts(filters);
  const productFiltersQuery = useGetProductFilters();

  const form = useForm<ProductFiltersForm>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: convertParamsToForm(filters),
  });

  const updateUrl = useCallback(
    (filters: ProductParamsRequest) => {
      if (isUpdatingUrl.current) {
        return;
      }

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'pageNumber' && value === 1) return;
          if (key === 'pageSize' && value === 12) return;
          params.set(key, value.toString());
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;

      router.replace(newUrl, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    if (!initializedFromUrl.current) {
      isUpdatingUrl.current = true;

      const urlFilters = convertUrlToParams(searchParams);
      if (Object.keys(urlFilters).length > 0) {
        initializeFromUrl(urlFilters);
      }

      initializedFromUrl.current = true;
      isUpdatingUrl.current = false;
    }
  });

  useEffect(() => {
    if (initializedFromUrl.current && !isUpdatingUrl.current) {
      updateUrl(filters);
    }
  }, [filters, updateUrl]);

  useEffect(() => {
    if (productsQuery.data) {
      setProducts(productsQuery.data.products || [], productsQuery.data.pagination);
    }
  }, [productsQuery.data, setProducts]);

  useEffect(() => {
    if (productFiltersQuery.data) {
      setAvailableFilters(productFiltersQuery.data);
    }
  }, [productFiltersQuery.data, setAvailableFilters]);

  useEffect(() => {
    const formValues = convertParamsToForm(filters);
    const currentValues = form.getValues();

    const fieldsToCheck: (keyof ProductFiltersForm)[] = [
      'search',
      'orderBy',
      'minPrice',
      'maxPrice',
      'brands',
      'categories',
      'condition',
    ];

    const hasChanged = fieldsToCheck.some((field) => {
      const formValue = formValues[field];
      const currentValue = currentValues[field];

      if (Array.isArray(formValue) && Array.isArray(currentValue)) {
        const changed =
          formValue.length !== currentValue.length ||
          !formValue.every((val, index) => val === currentValue[index]);

        return changed;
      }

      const changed = formValue !== currentValue;
      return changed;
    });

    if (hasChanged) {
      form.reset(formValues);
    }
  }, [filters, form]);

  const handleSubmit = useCallback(
    (data: ProductFiltersForm) => {
      const apiFilters = convertFormToParams(data);
      updateFilters(apiFilters);
    },
    [updateFilters],
  );

  const handleClear = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const handleSearchSubmit = useCallback(() => {
    const currentData = form.getValues();
    handleSubmit(currentData);
  }, [form, handleSubmit]);

  const isLoading = productsQuery.isLoading || productFiltersQuery.isLoading;
  const isError = productsQuery.isError || productFiltersQuery.isError;
  const error = productsQuery.error?.message || productFiltersQuery.error?.message || null;

  return {
    products,
    pagination,
    availableFilters,
    form,

    isLoading,
    isError,
    error,

    updateFilters,
    clearFilters,
    setPage,
    setPageSize,
    onSubmit: form.handleSubmit(handleSubmit),
    onSearchSubmit: handleSearchSubmit,
    onClear: handleClear,

    refetch: () => {
      productsQuery.refetch();
      productFiltersQuery.refetch();
    },
  };
};
