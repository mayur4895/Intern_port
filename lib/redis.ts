// lib/redis.ts
let Redis;

if (typeof window === 'undefined') {
  // Import Redis only on the server side
  Redis = require('ioredis');
}

const client = Redis ? new Redis() : null;

export default client;
