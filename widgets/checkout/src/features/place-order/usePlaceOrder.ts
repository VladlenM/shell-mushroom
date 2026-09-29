import { useState } from 'react';
import type { Bus, Cart, CheckoutRequest } from '@shop/contracts';
import { submitOrder } from './api';

export type SubmitStatus = 'idle' | 'submitting' | 'failed';

export interface PlacedOrder {
  id: string;
  itemCount: number;
  total: number;
}

export function usePlaceOrder(bus: Bus, cart: Cart) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const placeOrder = async (details: CheckoutRequest) => {
    setStatus('submitting');
    try {
      const { id } = await submitOrder(details);
      setPlacedOrder({ id, itemCount: cart.itemCount, total: cart.total });
      setStatus('idle');
      bus.publish('order.placed', { orderId: id });
    } catch {
      setStatus('failed');
    }
  };

  return { placedOrder, status, placeOrder };
}
