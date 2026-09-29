import { formatPrice } from '../../shared/format';
import type { PlacedOrder } from '../place-order';
import styles from './OrderConfirmation.module.css';

export function OrderConfirmation({ order }: { order: PlacedOrder }) {
  return (
    <div className={styles.confirmation}>
      <span className={styles.check} aria-hidden>
        ✓
      </span>
      <h3 className={styles.heading}>Order {order.id} confirmed</h3>
      <p className={styles.text}>
        {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'} · {formatPrice(order.total)}
      </p>
    </div>
  );
}
