import { useEffect, useState } from 'react';
import type { Bus, Screen } from '@shop/contracts';

export function useScreen(bus: Bus): Screen {
  const [screen, setScreen] = useState<Screen>('catalog');

  useEffect(() => {
    return bus.subscribe('navigation.requested', ({ screen: requestedScreen }) => {
      setScreen(requestedScreen);
    });
  }, [bus]);

  return screen;
}
