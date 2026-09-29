import { useEffect, useState } from 'react';
import type { Product } from '@shop/contracts';
import { fetchProducts } from './api';

export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetchProducts().then((loadedProducts) => {
      if (!cancelled) setProducts(loadedProducts);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return products;
}
