import { Suspense } from 'react';

import { ProductsSkeletonView, ProductsView } from '@/views';

export const metadata = {
  title: 'E-Commerce - Productos',
  description: 'Explora nuestra amplia gama de productos',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeletonView />}>
      <ProductsView />
    </Suspense>
  );
}
