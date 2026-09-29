import type { Cart, CartLine, Product } from '@shop/contracts';

export const emptyCart: Cart = { lines: [], itemCount: 0, total: 0 };

function withTotals(lines: CartLine[]): Cart {
  const itemCount = lines.reduce((count, line) => count + line.quantity, 0);
  const total = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0);
  return { lines, itemCount, total };
}

export function addProductToCart(cart: Cart, product: Product): Cart {
  const existingLine = cart.lines.find((line) => line.product.id === product.id);

  if (!existingLine) {
    return withTotals([...cart.lines, { product, quantity: 1 }]);
  }

  const lines = cart.lines.map((line) => {
    return line === existingLine ? { ...line, quantity: line.quantity + 1 } : line;
  });
  return withTotals(lines);
}

export function removeProductFromCart(cart: Cart, productId: string): Cart {
  return withTotals(cart.lines.filter((line) => line.product.id !== productId));
}
