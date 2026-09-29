import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { WidgetModule } from '@shop/contracts';
import { Checkout } from './Checkout';

let root: Root | null = null;

export const mount: WidgetModule['mount'] = (element, { bus }) => {
  root = createRoot(element);
  root.render(
    <StrictMode>
      <Checkout bus={bus} />
    </StrictMode>,
  );
};

export const unmount: WidgetModule['unmount'] = () => {
  root?.unmount();
  root = null;
};
