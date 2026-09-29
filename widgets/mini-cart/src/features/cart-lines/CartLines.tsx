import type { CartLine } from '@shop/contracts';
import { CartLineItem } from './CartLineItem';
import styles from './CartLines.module.css';

interface CartLinesProps {
  lines: CartLine[];
  onRemove: (productId: string) => void;
}

export function CartLines({ lines, onRemove }: CartLinesProps) {
  if (lines.length === 0) return <p className={styles.empty}>Your cart is empty.</p>;

  return (
    <ul className={styles.lines}>
      {lines.map((line) => (
        <li key={line.product.id}>
          <CartLineItem line={line} onRemove={() => onRemove(line.product.id)} />
        </li>
      ))}
    </ul>
  );
}
