import type { Bus } from '@shop/contracts';
import { CartLines } from './features/cart-lines';
import { useCart } from './features/cart-state';
import { CartTotal } from './features/cart-summary';
import { CheckoutButton, useCheckoutNavigation } from './features/checkout-link';
import styles from './MiniCart.module.css';

export function MiniCart({ bus }: { bus: Bus }) {
  const { cart, removeProduct } = useCart(bus);
  const goToCheckout = useCheckoutNavigation(bus);

  return (
    <section className={styles.tile}>
      <header className={styles.header}>
        <h2 className={styles.title}>Cart</h2>
        <span className={styles.count}>{cart.itemCount}</span>
      </header>

      <CartLines lines={cart.lines} onRemove={removeProduct} />

      <footer className={styles.footer}>
        <CartTotal total={cart.total} />
        <CheckoutButton disabled={cart.itemCount === 0} onClick={goToCheckout} />
      </footer>
    </section>
  );
}
