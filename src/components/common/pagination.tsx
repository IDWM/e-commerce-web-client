import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { PaginationResponse } from '@/models';

interface PaginationProps {
  pagination: PaginationResponse;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const Pagination = ({ pagination, onPageChange, onPageSizeChange }: PaginationProps) => {
  const { currentPage, totalPages, totalCount, pageSize } = pagination;

  const generatePageNumbers = () => {
    const pages = [];
    const delta = 2;

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-4'>
      <div className='flex items-center gap-4'>
        <div className='text-sm text-muted-foreground'>
          Mostrando {startItem} a {endItem} de {totalCount} productos
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm'>Productos por página:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className='w-20'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='6'>6</SelectItem>
              <SelectItem value='12'>12</SelectItem>
              <SelectItem value='24'>24</SelectItem>
              <SelectItem value='48'>48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className='h-4 w-4' />
          <span className='sr-only'>Página anterior</span>
        </Button>

        <div className='flex items-center gap-1'>
          {currentPage > 3 && (
            <>
              <Button variant='outline' size='sm' onClick={() => onPageChange(1)} className='w-10'>
                1
              </Button>
              {currentPage > 4 && <span className='px-2'>...</span>}
            </>
          )}

          {generatePageNumbers().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size='sm'
              onClick={() => onPageChange(page)}
              className='w-10'
            >
              {page}
            </Button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className='px-2'>...</span>}
              <Button
                variant='outline'
                size='sm'
                onClick={() => onPageChange(totalPages)}
                className='w-10'
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className='h-4 w-4' />
          <span className='sr-only'>Página siguiente</span>
        </Button>
      </div>
    </div>
  );
};
