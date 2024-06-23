'use server'   
 
import { db } from "@/lib/db";    
import { currentUser } from "@/lib/auth";
 
export const  getCompnayDetails = async ()=>{
      const LoginUser = await currentUser();
       
     try { 
    const userExist = await db.user.findUnique({
        where: {
        id: LoginUser.id
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
            id:LoginUser.id,
            
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