import type { Cart } from '@shop/contracts';
import { formatPrice } from '../../shared/format';
import styles from './OrderSummary.module.css';

export function OrderSummary({ cart }: { cart: Cart }) {
  return (
    <aside className={styles.summary}>
      <h3 className={styles.heading}>Order summary</h3>
      <ul className={styles.lines}>
        {cart.lines.map(({ product, quantity }) => (
          <li key={product.id} className={styles.line}>
            <span>
              {product.emoji} {product.name} × {quantity}
            </span>
            <span className={styles.amount}>{formatPrice(product.price * quantity)}</span>
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total</span>
        <strong>{formatPrice(cart.total)}</strong>
      </div>
    </aside>
  );
}
