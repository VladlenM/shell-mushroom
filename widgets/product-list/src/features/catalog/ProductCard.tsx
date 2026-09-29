import type { Product } from '@shop/contracts';
import { formatPrice } from '../../shared/format';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
}

export function ProductCard({ product, quantity, onAdd }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <span aria-hidden>{product.emoji}</span>
        {quantity > 0 && <span className={styles.badge}>{quantity} in cart</span>}
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <footer className={styles.footer}>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        <button type="button" className={styles.add} onClick={onAdd}>
          Add
        </button>
      </footer>
    </article>
  );
}
