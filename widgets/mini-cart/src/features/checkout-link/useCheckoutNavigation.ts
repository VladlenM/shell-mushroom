import { useCallback } from 'react';
import type { Bus } from '@shop/contracts';

export function useCheckoutNavigation(bus: Bus) {
  return useCallback(() => bus.publish('navigation.requested', { screen: 'checkout' }), [bus]);
}
