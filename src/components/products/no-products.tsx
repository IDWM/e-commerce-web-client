import { Search } from 'lucide-react';

import { Button } from '@/components';

interface NoProductsProps {
  onClearFilters: () => void;
}

export const NoProducts = ({ onClearFilters }: NoProductsProps) => {
  return (
    <div className='col-span-4 flex flex-col items-center justify-center py-16 px-4'>
      <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
        <Search className='w-10 h-10 text-gray-400' />
      </div>

      <h3 className='text-xl font-semibold text-gray-900 mb-2'>No se encontraron productos</h3>

      <p className='text-gray-600 text-center mb-6 max-w-md'>
        No hay productos que coincidan con los filtros aplicados. Intenta ajustar los criterios de
        búsqueda.
      </p>

      <Button onClick={onClearFilters} variant='outline'>
        Limpiar filtros
      </Button>
    </div>
  );
};
