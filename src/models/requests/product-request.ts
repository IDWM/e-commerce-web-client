import { z } from 'zod';

const baseProductFiltersSchema = z.object({
  search: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  orderBy: z.string().optional(),
});

const _productParamsSchema = baseProductFiltersSchema.extend({
  pageNumber: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(12),
  brands: z.string().optional(),
  categories: z.string().optional(),
  condition: z.number().optional(),
});

export type ProductParamsRequest = z.infer<typeof _productParamsSchema>;

export const productFiltersSchema = baseProductFiltersSchema.extend({
  brands: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  condition: z.number().optional(),
});

export type ProductFiltersForm = z.infer<typeof productFiltersSchema>;
