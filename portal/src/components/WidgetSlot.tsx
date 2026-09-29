import type { Bus } from '@shop/contracts';
import type { WidgetEntry } from '../core/manifest';
import { WidgetHost } from './WidgetHost';
import styles from './WidgetSlot.module.css';

interface WidgetSlotProps {
  entry: WidgetEntry;
  bus: Bus;
  leaving: boolean;
  outlined: boolean;
}

export function WidgetSlot({ entry, bus, leaving, outlined }: WidgetSlotProps) {
  const classNames = [styles.slot, styles[entry.slot]];
  if (leaving) classNames.push(styles.leaving);
  if (outlined) classNames.push(styles.outlined);

  return (
    <div className={classNames.join(' ')} data-widget={entry.name} data-version={entry.version}>
      <div className={styles.frame}>
        <span className={styles.label}>
          {entry.name} · {entry.version === 'dev' ? 'dev' : `v${entry.version}`}
        </span>
        <WidgetHost entry={entry} bus={bus} />
      </div>
    </div>
  );
}
