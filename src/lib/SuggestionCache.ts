import Dexie, {EntityTable} from "dexie";

interface SuggestionCacheEntry {
  id: number;
  countryCode: string;
  prefix: string;
  content: string;
  createdAt: number;
}

const SuggestionCache = new Dexie('SuggestionCache') as Dexie & {
  cache: EntityTable<SuggestionCacheEntry, 'id'>;
};

SuggestionCache.version(1).stores({
  cache: '++id, [countryCode+prefix]',
})

export type { SuggestionCacheEntry }
export { SuggestionCache }