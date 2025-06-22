export const PaginationSkeleton = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-4'>
      <div className='flex items-center gap-4'>
        <div className='h-5 bg-gray-200 rounded w-48 animate-pulse'></div>

        <div className='flex items-center gap-2'>
          <div className='h-5 bg-gray-200 rounded w-32 animate-pulse'></div>
          <div className='h-9 bg-gray-200 rounded w-20 animate-pulse'></div>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <div className='h-9 w-9 bg-gray-200 rounded animate-pulse'></div>

        <div className='flex items-center gap-1'>
          <div className='h-9 w-10 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-9 w-10 bg-gray-300 rounded animate-pulse'></div>
          <div className='h-9 w-10 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-9 w-10 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-9 w-10 bg-gray-200 rounded animate-pulse'></div>
        </div>

        <div className='h-9 w-9 bg-gray-200 rounded animate-pulse'></div>
      </div>
    </div>
  );
};
