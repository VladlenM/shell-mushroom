import { useEffect, useState } from 'react';
import { fetchManifest, type WidgetEntry } from '../core/manifest';

export function useManifest() {
  const [widgets, setWidgets] = useState<Map<string, WidgetEntry> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchManifest().then((manifest) => {
      const widgetsByName = new Map(manifest.widgets.map((widget) => [widget.name, widget]));
      setWidgets(widgetsByName);
    }, setError);
  }, []);

  return { widgets, error };
}
