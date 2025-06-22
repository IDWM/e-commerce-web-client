'use client';

import { NoProducts, Pagination, ProductCard, ProductFilters } from '@/components';
import { useProducts } from '@/hooks';
import { ProductsSkeletonView } from '@/views';

export const ProductsView = () => {
  const {
    products,
    pagination,
    availableFilters,
    form,
    isLoading,
    isError,
    error,
    setPage,
    setPageSize,
    onSubmit,
    onSearchSubmit,
    onClear,
  } = useProducts();

  if (isLoading) {
    return <ProductsSkeletonView />;
  }

  if (isError) {
    return (
      <div className='container mx-auto'>
        <div className='space-y-8'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold'>Error al cargar productos</h1>
            {error && <p className='text-red-500'>{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className='space-y-8'>
        <div className='grid grid-cols-4 gap-8'>
          <div className='col-span-1'>
            <ProductFilters
              form={form}
              onSubmit={onSubmit}
              onSearchSubmit={onSearchSubmit}
              onClear={onClear}
              availableBrands={availableFilters.brands}
              availableCategories={availableFilters.categories}
              minPrice={availableFilters.minPrice}
              maxPrice={availableFilters.maxPrice}
            />
          </div>

          <div className='col-span-3'>
            <div className='space-y-2'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold'>Productos</h1>
                <p className='text-muted-foreground'>
                  Encuentra los mejores productos al mejor precio
                </p>
              </div>

              <Pagination
                pagination={pagination}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />

              <div className='grid grid-cols-4 gap-6'>
                {products.length === 0 ? (
                  <NoProducts onClearFilters={onClear} />
                ) : (
                  products.map((product) => <ProductCard key={product.id} product={product} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
