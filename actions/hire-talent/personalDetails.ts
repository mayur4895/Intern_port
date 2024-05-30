// 'use server'  
// import { db } from "@/lib/db"; 
// import { profileSchema } from "@/schemas";
// import { zodResolver } from "@hookform/resolvers/zod"; 
// import { UserType } from "@prisma/client";
// import z from "zod"  
 
 
// export const  register = async (values :z.infer <typeof profileSchema>)=>{
      
//     try {
//         const validatedFields =  profileSchema.safeParse(values);

//          if(!validatedFields.success){
//             return   {error: "Invlaid Fields"}
//          };

// const {firstname,lastname,email,designation,phone,role} = validatedFields.data;

 
         
//     const userExist = await db.user.findUnique({
//         where: {
//           email: email,
//           role:UserType.EMPLOYER
//         }
//       });

//       if(userExist){

//         if(userExist.role == "STUDENT"){
//           return  {error: "This email is already registered as a student. "}
//         }
//         return  {error: "User already exists"}
//       }
      
//        await db.user.create({

//         data:{
//           firstname: firstname ,
//           lastname:lastname,
//           designation:designation,
//           email: email,
//           phone: +phone,   
//         }
//       })
       


//       return {success : "persoanl details saved"}
     
//       } catch (error) {
//         console.log(error); 
  
//       }
// }