import { useEffect, useState } from 'react';

const EXIT_DURATION_MS = 240;

export function usePresence(activeNames: readonly string[]) {
  const [renderedNames, setRenderedNames] = useState(activeNames);

  const leavingNames = renderedNames.filter((name) => !activeNames.includes(name));
  const isLeaving = leavingNames.length > 0;

  useEffect(() => {
    if (!isLeaving) return;

    const timer = setTimeout(() => setRenderedNames(activeNames), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeNames, isLeaving]);

  return {
    presentNames: isLeaving ? renderedNames : activeNames,
    leavingNames,
  };
}
