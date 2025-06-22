export const ProductFiltersSkeleton = () => {
  return (
    <div className='bg-card p-4 rounded-lg border animate-pulse'>
      <div className='flex items-center gap-2 mb-4'>
        <div className='w-4 h-4 bg-gray-300 rounded'></div>
        <div className='w-16 h-5 bg-gray-300 rounded'></div>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <div className='w-32 h-4 bg-gray-300 rounded'></div>
          <div className='relative'>
            <div className='w-full h-10 bg-gray-200 rounded border'></div>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='w-20 h-4 bg-gray-300 rounded'></div>
          <div className='w-full h-10 bg-gray-200 rounded border'></div>
        </div>

        <div className='space-y-2'>
          <div className='w-28 h-4 bg-gray-300 rounded'></div>
          <div className='flex gap-2'>
            <div className='flex-1 h-10 bg-gray-200 rounded border'></div>
            <div className='flex-1 h-10 bg-gray-200 rounded border'></div>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='w-16 h-4 bg-gray-300 rounded'></div>
          <div className='space-y-2 max-h-32'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-gray-200 rounded border'></div>
                <div className='w-20 h-4 bg-gray-200 rounded'></div>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-2'>
          <div className='w-20 h-4 bg-gray-300 rounded'></div>
          <div className='space-y-2 max-h-32'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-gray-200 rounded border'></div>
                <div className='w-24 h-4 bg-gray-200 rounded'></div>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-2'>
          <div className='w-18 h-4 bg-gray-300 rounded'></div>
          <div className='space-y-2'>
            {[...Array(2)].map((_, i) => (
              <div key={i} className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-gray-200 rounded border'></div>
                <div className='w-16 h-4 bg-gray-200 rounded'></div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='flex-1 h-10 bg-gray-300 rounded'></div>
          <div className='w-10 h-10 bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  );
};
