import type { Product } from '@shop/contracts';
import products from '../../__mocks__/products.json';

export function fetchProducts(): Promise<Product[]> {
  // GET /api/products
  return Promise.resolve(products);
}
