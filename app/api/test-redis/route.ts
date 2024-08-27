// app/api/test-redis/route.ts
import { NextResponse } from 'next/server';
import client from '@/lib/redis'; // Make sure this file uses server-side code

export async function GET() {
  if (!client) {
    return NextResponse.json({ error: 'Redis client not initialized' }, { status: 500 });
  }

  try {
    await client.set('test', 'Hello, Redis!');
    const value = await client.get('test');
    return NextResponse.json({ message: 'Success', value });
  } catch (error) {
    return NextResponse.json({ error: 'Redis error' }, { status: 500 });
  }
}
