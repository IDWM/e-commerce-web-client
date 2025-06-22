'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  convertFormToParams,
  convertParamsToForm,
  convertParamsToUrl,
  convertUrlToParams,
} from '@/libs';
import { ProductFiltersForm, productFiltersSchema, ProductParamsRequest } from '@/models';
import { useGetProductFilters, useGetProducts } from '@/services';
import { useProductStore } from '@/stores';

export const useProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

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

  const initialValues = convertParamsToForm(
    Object.keys(convertUrlToParams(searchParams)).length > 0
      ? { ...filters, ...convertUrlToParams(searchParams) }
      : filters,
  );

  if (initialValues.condition === undefined) {
    initialValues.condition = 0;
  }

  const form = useForm<ProductFiltersForm>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (!isInitialized.current) {
      const urlFilters = convertUrlToParams(searchParams);
      if (Object.keys(urlFilters).length > 0) {
        initializeFromUrl(urlFilters);
      }
      isInitialized.current = true;
    }
  }, [searchParams, initializeFromUrl]);

  const updateUrl = useCallback(
    (filters: ProductParamsRequest) => {
      const params = convertParamsToUrl(filters);
      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    if (isInitialized.current) {
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

  const handleSubmit = useCallback(
    (data: ProductFiltersForm) => {
      const apiFilters = convertFormToParams(data);
      updateFilters(apiFilters);
    },
    [updateFilters],
  );

  const handleClear = useCallback(() => {
    const defaultValues = convertParamsToForm({
      pageNumber: 1,
      pageSize: 12,
      orderBy: undefined,
      search: undefined,
      brands: undefined,
      categories: undefined,
      condition: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });

    defaultValues.condition = 0;

    form.reset(defaultValues);
    clearFilters();
  }, [clearFilters, form]);

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
