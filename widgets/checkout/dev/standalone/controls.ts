import type { Bus, Cart } from '@shop/contracts';

const cart: Cart = {
  lines: [
    { product: { id: 'keyboard', name: 'Mechanical Keyboard', price: 129, emoji: '⌨️' }, quantity: 2 },
    { product: { id: 'mouse', name: 'Wireless Mouse', price: 59, emoji: '🖱️' }, quantity: 1 },
  ],
  itemCount: 3,
  total: 317,
};

export function createControls(bus: Bus): HTMLElement[] {
  const button = document.createElement('button');
  button.textContent = 'Simulate cart.changed (3 items)';
  button.onclick = () => bus.publish('cart.changed', cart);
  return [button];
}
