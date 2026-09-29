import { useEffect, useRef, useState } from 'react';
import type { Bus, WidgetModule } from '@shop/contracts';
import { loadWidget } from '../core/loadWidget';
import type { WidgetEntry } from '../core/manifest';
import styles from './WidgetHost.module.css';

interface WidgetHostProps {
  entry: WidgetEntry;
  bus: Bus;
}

export function WidgetHost({ entry, bus }: WidgetHostProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let widget: WidgetModule | undefined;

    loadWidget(entry.url)
      .then((loaded) => {
        if (disposed) return;
        loaded.mount(elementRef.current!, { bus });
        widget = loaded;
      })
      .catch((error) => {
        console.error(`Widget "${entry.name}" failed to load`, error);
        if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      widget?.unmount();
    };
  }, [entry.name, entry.url, bus]);

  return (
    <>
      {failed && (
        <div className={styles.unavailable}>
          <strong>{entry.name}</strong> is unavailable right now.
        </div>
      )}
      <div ref={elementRef} />
    </>
  );
}
