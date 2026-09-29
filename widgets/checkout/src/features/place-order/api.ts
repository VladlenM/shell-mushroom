import type { CheckoutRequest, Order } from '@shop/contracts';
import order from '../../__mocks__/order.json';

export function submitOrder(_details: CheckoutRequest): Promise<Order> {
  // POST /api/orders
  return Promise.resolve(order);
}
