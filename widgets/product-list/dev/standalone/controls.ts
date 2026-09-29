import type { Bus, Cart } from '@shop/contracts';

const cartWithKeyboard: Cart = {
  lines: [{ product: { id: 'keyboard', name: 'Mechanical Keyboard', price: 129, emoji: '⌨️' }, quantity: 2 }],
  itemCount: 2,
  total: 258,
};

export function createControls(bus: Bus): HTMLElement[] {
  const button = document.createElement('button');
  button.textContent = 'Simulate cart.changed (2 keyboards)';
  button.onclick = () => bus.publish('cart.changed', cartWithKeyboard);
  return [button];
}
