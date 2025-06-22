import { ProductCondition, ProductFiltersForm, ProductParamsRequest } from '@/models';

const conditionLabels = ['all', 'new', 'old'];
const conditionValues = [undefined, ProductCondition.NEW, ProductCondition.OLD];

export const convertFormToParams = (form: ProductFiltersForm): Partial<ProductParamsRequest> => {
  return {
    search: form.search || undefined,
    brands: form.brands?.length ? form.brands.join(',') : undefined,
    categories: form.categories?.length ? form.categories.join(',') : undefined,
    condition:
      form.condition !== undefined && form.condition > 0
        ? conditionValues[form.condition]
        : undefined,
    minPrice: form.minPrice,
    maxPrice: form.maxPrice,
    orderBy: form.orderBy && form.orderBy !== 'default' ? form.orderBy : undefined,
  };
};

export const convertParamsToForm = (params: ProductParamsRequest): ProductFiltersForm => {
  let conditionIndex = 0;
  if (params.condition !== undefined) {
    conditionIndex = conditionValues.findIndex((val) => val === params.condition);
    if (conditionIndex === -1) conditionIndex = 0;
  }

  return {
    search: params.search || '',
    brands: params.brands?.split(',').filter(Boolean) || [],
    categories: params.categories?.split(',').filter(Boolean) || [],
    condition: conditionIndex,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    orderBy: params.orderBy || 'default',
  };
};

const convertUrlParamValue = (key: string, value: string): string | number | undefined => {
  const numericKeys = ['pageNumber', 'pageSize', 'minPrice', 'maxPrice'];

  if (numericKeys.includes(key)) {
    const numValue = Number(value);
    return isNaN(numValue) ? undefined : numValue;
  }

  if (key === 'condition') {
    const conditionIndex = conditionLabels.findIndex((label) => label === value);
    return conditionIndex >= 0 ? conditionIndex : 0;
  }

  return value;
};

const VALID_PARAM_KEYS = [
  'pageNumber',
  'pageSize',
  'orderBy',
  'search',
  'brands',
  'categories',
  'condition',
  'minPrice',
  'maxPrice',
] as const;

type ValidParamKey = (typeof VALID_PARAM_KEYS)[number];

const isValidParamKey = (key: string): key is ValidParamKey => {
  return VALID_PARAM_KEYS.includes(key as ValidParamKey);
};

export const convertUrlToParams = (
  searchParams: URLSearchParams,
): Partial<ProductParamsRequest> => {
  const urlFilters: Partial<ProductParamsRequest> = {};

  searchParams.forEach((value, key) => {
    if (isValidParamKey(key)) {
      const convertedValue = convertUrlParamValue(key, value);

      switch (key) {
        case 'pageNumber':
          if (typeof convertedValue === 'number') {
            urlFilters.pageNumber = convertedValue;
          }
          break;
        case 'pageSize':
          if (typeof convertedValue === 'number') {
            urlFilters.pageSize = convertedValue;
          }
          break;
        case 'minPrice':
          if (typeof convertedValue === 'number') {
            urlFilters.minPrice = convertedValue;
          }
          break;
        case 'maxPrice':
          if (typeof convertedValue === 'number') {
            urlFilters.maxPrice = convertedValue;
          }
          break;
        case 'condition':
          if (typeof convertedValue === 'number') {
            urlFilters.condition = conditionValues[convertedValue];
          }
          break;
        case 'search':
          if (typeof convertedValue === 'string') {
            urlFilters.search = convertedValue;
          }
          break;
        case 'brands':
          if (typeof convertedValue === 'string') {
            urlFilters.brands = convertedValue;
          }
          break;
        case 'categories':
          if (typeof convertedValue === 'string') {
            urlFilters.categories = convertedValue;
          }
          break;
        case 'orderBy':
          if (typeof convertedValue === 'string') {
            urlFilters.orderBy = convertedValue;
          }
          break;
      }
    }
  });

  return urlFilters;
};

export const convertParamsToUrl = (params: ProductParamsRequest): URLSearchParams => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (key === 'pageNumber' && value === 1) return;
      if (key === 'pageSize' && value === 12) return;

      if (key === 'condition') {
        const conditionIndex = conditionValues.findIndex((val) => val === value);
        if (conditionIndex > 0) {
          urlParams.set(key, conditionLabels[conditionIndex]);
        }
      } else {
        urlParams.set(key, value.toString());
      }
    }
  });

  return urlParams;
};
