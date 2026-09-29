import type { Bus, EventMap, EventName } from '@shop/contracts';

type Handler = (payload: unknown) => void;

export function createMockBus(onPublish: (topic: EventName, payload: unknown) => void): Bus {
  const handlersByTopic = new Map<EventName, Set<Handler>>();
  const lastPayloadByTopic = new Map<EventName, unknown>();

  return {
    publish(topic, payload) {
      lastPayloadByTopic.set(topic, payload);
      onPublish(topic, payload);
      handlersByTopic.get(topic)?.forEach((handler) => handler(payload));
    },

    subscribe(topic, handler, options) {
      const handlers = handlersByTopic.get(topic) ?? new Set<Handler>();
      handlersByTopic.set(topic, handlers);
      handlers.add(handler as Handler);

      if (options?.replay && lastPayloadByTopic.has(topic)) {
        handler(lastPayloadByTopic.get(topic) as EventMap[typeof topic]);
      }

      return () => {
        handlers.delete(handler as Handler);
      };
    },
  };
}
