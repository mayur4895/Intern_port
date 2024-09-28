'use server';

import { db } from "@/lib/db";
import { Application, Post } from '@prisma/client';
import axios from "axios";

 
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getApplicationsofPost = async (postId: string): Promise<{ data?: Application[], error?: string }> => {
  if (!isValidObjectId(postId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
 
    const data = await db.application.findMany({
      where:{
        postId 
      },
    })

    if (!data) {
      return { error: 'Post not found' };
    }

    return { data };
  } catch (error) {
    console.error('Failed to retrieve post:', error);
    return { error: 'Failed to retrieve post' };
  }
};