'use server';

import { db } from "@/lib/db";
import redisClient from "@/lib/redis";

const CACHE_KEY = 'all_internships';
const CACHE_EXPIRATION = 60 * 60; // 1 hour in seconds

export const getAllInternships = async () => {
  try {
    // Check Redis cache
    const cachedData = await redisClient.get(CACHE_KEY);
    
    if (cachedData) {
      console.log('Cache hit');
      return { success: "posts data from cache", data: JSON.parse(cachedData) };
    }

    // Fetch data from the database
    const data = await db.post.findMany({});

    // Store data in Redis cache
    await redisClient.set(CACHE_KEY, JSON.stringify(data), 'EX', CACHE_EXPIRATION);

    console.log('Cache miss');
    return { success: "posts data from database", data };
    
  } catch (error) {
    console.error(error);
    return { error: "error fetching posts" };
  }
};
