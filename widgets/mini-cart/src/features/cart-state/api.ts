import type { Cart } from '@shop/contracts';
import cart from '../../__mocks__/cart.json';

export function fetchCart(): Promise<Cart> {
  // GET /api/cart
  return Promise.resolve(cart);
}
