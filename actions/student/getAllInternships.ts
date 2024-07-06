'use server';

import { db } from "@/lib/db";    
import { currentUser } from "@/lib/auth";

export const getAllInternships = async () => {
 
   
  try { 
    

    
 

      const data = await db.post.findMany({
         
        
      });
      console.log({"posts data are":data})
      return { success: "posts data", data };
    
 
    
    
 
  } catch (error) {
    console.log(error);
    return { error: "error fetching posts" };
  }
}
