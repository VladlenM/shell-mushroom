import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { WidgetModule } from '@shop/contracts';
import { MiniCart } from './MiniCart';

let root: Root | null = null;

export const mount: WidgetModule['mount'] = (element, { bus }) => {
  root = createRoot(element);
  root.render(
    <StrictMode>
      <MiniCart bus={bus} />
    </StrictMode>,
  );
};

export const unmount: WidgetModule['unmount'] = () => {
  root?.unmount();
  root = null;
};
