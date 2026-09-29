import type { Cart, Product } from './models';

export type Screen = 'catalog' | 'checkout';

export interface EventMap {
  'cart.addRequested': { product: Product };
  'cart.changed': Cart;
  'navigation.requested': { screen: Screen };
  'order.placed': { orderId: string };
}

export type EventName = keyof EventMap;
