import type { EventBus } from '../core/eventBus';
import { useEventLog } from '../hooks/useEventLog';
import styles from './EventLog.module.css';

export function EventLog({ bus }: { bus: EventBus }) {
  const { entries, clear } = useEventLog(bus);

  return (
    <section className={styles.log}>
      <header className={styles.header}>
        <h2 className={styles.title}>Event log</h2>
        <button type="button" className={styles.clear} onClick={clear}>
          Clear
        </button>
      </header>

      {entries.length === 0 ? (
        <p className={styles.empty}>Events published on the bus appear here.</p>
      ) : (
        <ul className={styles.entries}>
          {entries.map((entry) => (
            <li key={entry.id} className={styles.entry}>
              <time className={styles.time}>{entry.time}</time>
              <span className={styles.topic}>{entry.topic}</span>
              <code className={styles.payload}>{JSON.stringify(entry.payload)}</code>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
