import type { ReactNode } from 'react';
import type { Bus } from '@shop/contracts';
import { emptyCart, useCartSnapshot } from './features/cart-sync';
import { CheckoutForm } from './features/checkout-form';
import { useRedirectWhenCartEmpty } from './features/empty-cart-redirect';
import { OrderConfirmation } from './features/order-confirmation';
import { OrderSummary } from './features/order-summary';
import { usePlaceOrder } from './features/place-order';
import styles from './Checkout.module.css';

export function Checkout({ bus }: { bus: Bus }) {
  const cartSnapshot = useCartSnapshot(bus);
  const cart = cartSnapshot ?? emptyCart;
  const { placedOrder, status, placeOrder } = usePlaceOrder(bus, cart);
  useRedirectWhenCartEmpty(bus, cartSnapshot, placedOrder !== null);

  let content: ReactNode;
  if (placedOrder) {
    content = <OrderConfirmation order={placedOrder} />;
  } else if (cart.itemCount === 0) {
    content = <p className={styles.empty}>There is nothing to check out yet.</p>;
  } else {
    content = (
      <div className={styles.layout}>
        <CheckoutForm status={status} onSubmit={placeOrder} />
        <OrderSummary cart={cart} />
      </div>
    );
  }

  return (
    <section className={styles.tile}>
      <h2 className={styles.title}>Checkout</h2>
      {content}
    </section>
  );
}
