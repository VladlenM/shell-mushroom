import type { EventMap, EventName } from './events';

export type Unsubscribe = () => void;

export interface SubscribeOptions {
  replay?: boolean;
}

export interface Bus {
  publish<T extends EventName>(topic: T, payload: EventMap[T]): void;
  subscribe<T extends EventName>(
    topic: T,
    handler: (payload: EventMap[T]) => void,
    options?: SubscribeOptions,
  ): Unsubscribe;
}

export interface WidgetContext {
  bus: Bus;
}

export interface WidgetModule {
  mount(element: HTMLElement, context: WidgetContext): void;
  unmount(): void;
}
