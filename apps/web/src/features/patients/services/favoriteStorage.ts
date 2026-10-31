export const FAVORITES_STORAGE_KEY = 'klinlink-favorites';

export function readFavorites(storage: Pick<Storage, 'getItem'> = window.localStorage): number[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(FAVORITES_STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((value): value is number => Number.isInteger(value) && value > 0))];
  } catch {
    return [];
  }
}

export function writeFavorites(ids: number[], storage: Pick<Storage, 'setItem'> = window.localStorage): number[] {
  const normalized = [...new Set(ids.filter((value) => Number.isInteger(value) && value > 0))];
  storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}
