import { useEffect } from 'react';
import type { Bus, Cart } from '@shop/contracts';

export function useRedirectWhenCartEmpty(bus: Bus, cart: Cart | null, orderPlaced: boolean) {
  useEffect(() => {
    const cartIsEmpty = cart !== null && cart.itemCount === 0;

    if (cartIsEmpty && !orderPlaced) {
      bus.publish('navigation.requested', { screen: 'catalog' });
    }
  }, [bus, cart, orderPlaced]);
}
