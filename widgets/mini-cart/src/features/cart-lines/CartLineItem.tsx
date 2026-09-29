import type { CartLine } from '@shop/contracts';
import { formatPrice } from '../../shared/format';
import styles from './CartLineItem.module.css';

interface CartLineItemProps {
  line: CartLine;
  onRemove: () => void;
}

export function CartLineItem({ line, onRemove }: CartLineItemProps) {
  const { product, quantity } = line;

  return (
    <article className={styles.line}>
      <span className={styles.emoji} aria-hidden>
        {product.emoji}
      </span>
      <div className={styles.details}>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.meta}>
          {quantity} × {formatPrice(product.price)}
        </span>
      </div>
      <button type="button" className={styles.remove} aria-label={`Remove ${product.name}`} onClick={onRemove}>
        ×
      </button>
    </article>
  );
}
