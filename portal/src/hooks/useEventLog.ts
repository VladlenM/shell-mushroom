import { useEffect, useState } from 'react';
import type { EventBus, LogEntry } from '../core/eventBus';

const MAX_ENTRIES = 50;

export function useEventLog(bus: EventBus) {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    return bus.observe((entry) => {
      setEntries((current) => [entry, ...current].slice(0, MAX_ENTRIES));
    });
  }, [bus]);

  const clear = () => setEntries([]);

  return { entries, clear };
}
