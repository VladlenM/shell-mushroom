import type { WidgetModule } from '@shop/contracts';

export const loadWidget = (url: string): Promise<WidgetModule> => import(/* @vite-ignore */ url);
