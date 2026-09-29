import { useCallback, useEffect, useRef, useState } from 'react';
import type { Bus, Cart } from '@shop/contracts';
import { fetchCart } from './api';
import { addProductToCart, emptyCart, removeProductFromCart } from './cart';

export function useCart(bus: Bus) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const latestCart = useRef(cart);

  const updateCart = useCallback(
    (nextCart: Cart) => {
      latestCart.current = nextCart;
      setCart(nextCart);
      bus.publish('cart.changed', nextCart);
    },
    [bus],
  );

  useEffect(() => {
    let cancelled = false;

    fetchCart().then((initialCart) => {
      if (!cancelled) updateCart(initialCart);
    });

    const subscriptions = [
      bus.subscribe('cart.addRequested', ({ product }) => {
        updateCart(addProductToCart(latestCart.current, product));
      }),
      bus.subscribe('order.placed', () => updateCart(emptyCart)),
    ];

    return () => {
      cancelled = true;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    };
  }, [bus, updateCart]);

  const removeProduct = (productId: string) => {
    updateCart(removeProductFromCart(latestCart.current, productId));
  };

  return { cart, removeProduct };
}
