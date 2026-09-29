import { useMemo, useState } from 'react';
import { EventLog } from './components/EventLog';
import { Header } from './components/Header';
import { WidgetSlot } from './components/WidgetSlot';
import { createEventBus } from './core/eventBus';
import { useManifest } from './hooks/useManifest';
import { usePresence } from './hooks/usePresence';
import { useScreen } from './hooks/useScreen';
import { screens } from './screens';
import styles from './App.module.css';

export function App() {
  const bus = useMemo(createEventBus, []);
  const { widgets, error } = useManifest();
  const screen = useScreen(bus);
  const { presentNames, leavingNames } = usePresence(screens[screen]);
  const [outlined, setOutlined] = useState(true);

  return (
    <div className={styles.page}>
      <Header screen={screen} outlined={outlined} onOutlinedChange={setOutlined} />

      <main className={styles.layout}>
        {error && <p className={styles.notice}>The widget manifest could not be loaded.</p>}
        {widgets &&
          presentNames.map((name) => {
            const entry = widgets.get(name);
            if (!entry) return null;

            return (
              <WidgetSlot
                key={name}
                entry={entry}
                bus={bus}
                leaving={leavingNames.includes(name)}
                outlined={outlined}
              />
            );
          })}
      </main>

      <EventLog bus={bus} />
    </div>
  );
}
