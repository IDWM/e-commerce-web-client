import { Suspense } from 'react';

import { ProductsFallbackView, ProductsView } from '@/views';

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsFallbackView />}>
      <ProductsView />
    </Suspense>
  );
}
