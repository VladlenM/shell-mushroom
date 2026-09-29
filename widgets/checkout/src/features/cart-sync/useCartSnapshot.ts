import { useEffect, useState } from 'react';
import type { Bus, Cart } from '@shop/contracts';

export function useCartSnapshot(bus: Bus): Cart | null {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    return bus.subscribe('cart.changed', setCart, { replay: true });
  }, [bus]);

  return cart;
}
