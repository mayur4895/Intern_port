// lib/redis.ts
let Redis;

if (typeof window === 'undefined') {
 
  Redis = require('ioredis');
}

const client = Redis ? new Redis() : null;

export default client;
