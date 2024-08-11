// src/app/api/post/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'postId query parameter is required' }, { status: 400 });
    }

    const apiUrl = `https://rushimodel-adbe490bb85c.herokuapp.com/post/${postId}`;
    const response = await axios.get(apiUrl);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
