import type { Bus, Product } from '@shop/contracts';

const products: Product[] = [
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 129, emoji: '⌨️' },
  { id: 'monitor', name: '27" Monitor', price: 349, emoji: '🖥️' },
];

export function createControls(bus: Bus): HTMLElement[] {
  return products.map((product) => {
    const button = document.createElement('button');
    button.textContent = `Simulate cart.addRequested (${product.name})`;
    button.onclick = () => bus.publish('cart.addRequested', { product });
    return button;
  });
}
