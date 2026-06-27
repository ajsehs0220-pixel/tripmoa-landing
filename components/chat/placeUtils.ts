import type { Place } from './types';

export function matchPlace(label: string, places: Place[]): Place | undefined {
  const name = label.trim();
  if (!name) return undefined;

  return places.find(
    (p) =>
      p.name === name ||
      p.name.includes(name) ||
      name.includes(p.name)
  );
}

export function extractPlaceName(line: string): string | null {
  const match = line.match(/\*\*([^*]+)\*\*/);
  return match ? match[1].trim() : null;
}
