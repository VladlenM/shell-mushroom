export type SlotName = 'main' | 'aside';

export interface WidgetEntry {
  name: string;
  slot: SlotName;
  version: string;
  url: string;
}

export interface Manifest {
  widgets: WidgetEntry[];
}

const MANIFEST_URL = import.meta.env.DEV ? '/manifest.dev.json' : '/manifest.json';

export async function fetchManifest(): Promise<Manifest> {
  const response = await fetch(MANIFEST_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Manifest request failed: ${response.status}`);
  return response.json();
}
