export const ProductCardSkeleton = () => {
  return (
    <div className='bg-card rounded-lg border p-4 animate-pulse'>
      <div className='aspect-square relative mb-4 overflow-hidden rounded-md bg-muted'>
        <div className='w-full h-full bg-gray-300'></div>
      </div>

      <div className='space-y-2'>
        <div className='flex items-start justify-between'>
          <div className='flex-1 mr-2'>
            <div className='h-4 bg-gray-300 rounded mb-1'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
          </div>
          <div className='w-16 h-6 bg-gray-300 rounded-full'></div>
        </div>

        <div className='space-y-1'>
          <div className='h-3 bg-gray-200 rounded'></div>
          <div className='h-3 bg-gray-200 rounded w-5/6'></div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='h-3 bg-gray-200 rounded w-1/3'></div>
          <div className='h-3 bg-gray-200 rounded w-1/4'></div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='h-5 bg-gray-300 rounded w-20'></div>
          <div className='h-3 bg-gray-200 rounded w-16'></div>
        </div>

        <div className='w-full h-9 bg-gray-300 rounded'></div>
      </div>
    </div>
  );
};
