'use server'   
 
import { db } from "@/lib/db";    
import { currentUser } from "@/lib/auth";
 
export const  getCompnayDetails = async ( userId:string)=>{
      const LoginUser = await currentUser();
     try { 
 
         
    const userExist = await db.user.findUnique({
        where: {
        id: userId
        }
      });

       if(!userExist){
        return  {error: "something went wrong"}
      }

      if(userExist){

        if(userExist.role == "STUDENT"){
          return  {error: "something went wrong"}
        }
        

        const data = await db.user.findUnique({
          where:{
            id:userId,
            
          },include:{
            compnayDetails:true
          }
        })
       return  {success:"getData" , data}
      }   
      } catch (error) {
        console.log(error); 
  
      }
}