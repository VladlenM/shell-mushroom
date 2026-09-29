import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { WidgetModule } from '@shop/contracts';
import { ProductList } from './ProductList';

let root: Root | null = null;

export const mount: WidgetModule['mount'] = (element, { bus }) => {
  root = createRoot(element);
  root.render(
    <StrictMode>
      <ProductList bus={bus} />
    </StrictMode>,
  );
};

export const unmount: WidgetModule['unmount'] = () => {
  root?.unmount();
  root = null;
};
