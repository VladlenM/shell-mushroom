import type { Screen } from '@shop/contracts';

export const screens: Record<Screen, readonly string[]> = {
  catalog: ['product-list', 'mini-cart'],
  checkout: ['checkout', 'mini-cart'],
};
