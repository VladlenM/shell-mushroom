import { formatPrice } from '../../shared/format';
import styles from './CartTotal.module.css';

export function CartTotal({ total }: { total: number }) {
  return (
    <div className={styles.total}>
      <span>Total</span>
      <strong className={styles.amount}>{formatPrice(total)}</strong>
    </div>
  );
}
