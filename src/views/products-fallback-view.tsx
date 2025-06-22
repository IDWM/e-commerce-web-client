import { ProductCardSkeleton, ProductFiltersSkeleton } from '@/components';

export const ProductsFallbackView = () => {
  return (
    <div className='container mx-auto'>
      <div className='space-y-8'>
        <div className='space-y-2'>
          <div className='h-9 bg-gray-300 rounded w-48 animate-pulse'></div>
          <div className='h-5 bg-gray-200 rounded w-96 animate-pulse'></div>
        </div>
        <div className='grid grid-cols-4 gap-8'>
          <div className='col-span-1'>
            <ProductFiltersSkeleton />
          </div>
          <div className='col-span-3'>
            <div className='grid grid-cols-4 gap-6'>
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
