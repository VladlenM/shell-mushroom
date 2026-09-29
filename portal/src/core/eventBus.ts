import type { Bus, EventName, Unsubscribe } from '@shop/contracts';

export interface LogEntry {
  id: number;
  time: string;
  topic: EventName;
  payload: unknown;
}

export interface EventBus extends Bus {
  observe(listener: (entry: LogEntry) => void): Unsubscribe;
}

type Handler = (payload: unknown) => void;

export function createEventBus(): EventBus {
  const handlersByTopic = new Map<EventName, Set<Handler>>();
  const lastPayloadByTopic = new Map<EventName, unknown>();
  const observers = new Set<(entry: LogEntry) => void>();
  let lastEntryId = 0;

  const deliver = (topic: EventName, handler: Handler, payload: unknown) => {
    setTimeout(() => {
      try {
        handler(payload);
      } catch (error) {
        console.error(`Subscriber of "${topic}" failed`, error);
      }
    }, 0);
  };

  return {
    publish(topic, payload) {
      const entry: LogEntry = {
        id: ++lastEntryId,
        time: new Date().toLocaleTimeString(),
        topic,
        payload,
      };
      lastPayloadByTopic.set(topic, payload);
      observers.forEach((observer) => observer(entry));
      handlersByTopic.get(topic)?.forEach((handler) => deliver(topic, handler, payload));
    },

    subscribe(topic, handler, options) {
      const handlers = handlersByTopic.get(topic) ?? new Set<Handler>();
      handlersByTopic.set(topic, handlers);
      handlers.add(handler as Handler);

      if (options?.replay && lastPayloadByTopic.has(topic)) {
        deliver(topic, handler as Handler, lastPayloadByTopic.get(topic));
      }

      return () => {
        handlers.delete(handler as Handler);
      };
    },

    observe(listener) {
      observers.add(listener);
      return () => {
        observers.delete(listener);
      };
    },
  };
}
