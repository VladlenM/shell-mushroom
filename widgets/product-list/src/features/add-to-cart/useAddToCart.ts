import { useCallback } from 'react';
import type { Bus, Product } from '@shop/contracts';

export function useAddToCart(bus: Bus) {
  return useCallback((product: Product) => bus.publish('cart.addRequested', { product }), [bus]);
}
