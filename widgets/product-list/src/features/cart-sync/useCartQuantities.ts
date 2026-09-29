import { useEffect, useState } from 'react';
import type { Bus, Cart } from '@shop/contracts';

type QuantitiesByProductId = Record<string, number>;

function toQuantities(cart: Cart): QuantitiesByProductId {
  const quantities: QuantitiesByProductId = {};
  for (const line of cart.lines) {
    quantities[line.product.id] = line.quantity;
  }
  return quantities;
}

export function useCartQuantities(bus: Bus): QuantitiesByProductId {
  const [quantities, setQuantities] = useState<QuantitiesByProductId>({});

  useEffect(() => {
    return bus.subscribe('cart.changed', (cart) => setQuantities(toQuantities(cart)), { replay: true });
  }, [bus]);

  return quantities;
}
