// lib/cache.ts
import redis from './redis';

const CACHE_PREFIX = 'cache:';

export const getCachedData = async (key: string) => {
  const data = await redis.get(CACHE_PREFIX + key);
  return data ? JSON.parse(data) : null;
};

export const setCachedData = async (key: string, data: any, ttl: number) => {
  await redis.set(CACHE_PREFIX + key, JSON.stringify(data), 'EX', ttl);
};
