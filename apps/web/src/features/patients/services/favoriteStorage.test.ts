import { describe, expect, it } from 'vitest';
import { readFavorites, writeFavorites, FAVORITES_STORAGE_KEY } from './favoriteStorage';

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
}

describe('favorite storage', () => {
  it('reads and deduplicates legacy favorite IDs', () => {
    const storage = memoryStorage({ [FAVORITES_STORAGE_KEY]: '[1,2,2,"3",-1]' });
    expect(readFavorites(storage)).toEqual([1, 2]);
  });
  it('safely handles malformed data', () => {
    expect(readFavorites(memoryStorage({ [FAVORITES_STORAGE_KEY]: '{bad' }))).toEqual([]);
  });
  it('writes normalized IDs without duplicates', () => {
    const storage = memoryStorage();
    expect(writeFavorites([3, 3, 0, -2, 4], storage)).toEqual([3, 4]);
    expect(readFavorites(storage)).toEqual([3, 4]);
  });
});
