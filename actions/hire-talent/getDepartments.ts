'use server';

import { db } from "@/lib/db";    
import { currentUser } from "@/lib/auth";

export const getDepartments = async () => {
    const LoginUser = await currentUser();

    try { 
        const userExist = await db.user.findUnique({
          where: {
            id: LoginUser.id
          }
        });
    
        if (!userExist) {
          return { error: "something went wrong" };
        }
    
        if (userExist.role === "STUDENT") {
          return { error: "something went wrong" };
        }
        
        const data = await db.department.findMany({});
    
        return { success: "Department data", data };
      } catch (error) {
     
        return { error: "error fetching Departments" };
      }

}