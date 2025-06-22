import Image from 'next/image';

import { Badge, Button } from '@/components';
import { formatPrice } from '@/libs';
import { Product, ProductCondition } from '@/models';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const getConditionLabel = (condition: ProductCondition) => {
    return condition === ProductCondition.NEW ? 'Nuevo' : 'Usado';
  };

  const getConditionColor = (condition: ProductCondition) => {
    return condition === ProductCondition.NEW
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className='bg-card rounded-lg border p-4 transition-shadow'>
      <div className='aspect-square relative mb-4 overflow-hidden rounded-md bg-muted'>
        <Image
          src='https://cdn-icons-png.flaticon.com/512/9402/9402212.png'
          alt={product.name}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-start justify-between'>
          <h3 className='font-semibold text-sm line-clamp-2'>{product.name}</h3>
          <Badge variant='secondary' className={getConditionColor(product.condition)}>
            {getConditionLabel(product.condition)}
          </Badge>
        </div>

        <p className='text-xs text-muted-foreground line-clamp-2'>{product.description}</p>

        <div className='flex items-center justify-between text-xs text-muted-foreground'>
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='font-bold text-lg'>{formatPrice(product.price)}</span>
          <span className='text-xs text-muted-foreground'>Stock: {product.stock}</span>
        </div>

        <Button className='w-full' disabled={product.stock === 0 || !product.isActive}>
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
      </div>
    </div>
  );
};
