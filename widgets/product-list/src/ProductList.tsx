import type { Bus } from '@shop/contracts';
import { useAddToCart } from './features/add-to-cart';
import { ProductCard, useProducts } from './features/catalog';
import { useCartQuantities } from './features/cart-sync';
import styles from './ProductList.module.css';

export function ProductList({ bus }: { bus: Bus }) {
  const products = useProducts();
  const quantities = useCartQuantities(bus);
  const addToCart = useAddToCart(bus);

  return (
    <section className={styles.tile}>
      <header className={styles.header}>
        <h2 className={styles.title}>Products</h2>
        <span className={styles.count}>{products.length} items</span>
      </header>

      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} quantity={quantities[product.id] ?? 0} onAdd={() => addToCart(product)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
