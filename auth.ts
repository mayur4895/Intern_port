import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, UserRole } from "@prisma/client"
import authConfig from "./auth.config"
import { getUserById } from "./data/user" 
import { db } from "./lib/db"
import { getTwoFactorTokenbyEmail } from "./data/two-facror-token"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
const prisma = new PrismaClient()
 
export const { handlers, auth ,signIn,signOut} = NextAuth({
   pages:{
      signIn:"/auth/login",
      error:"/auth/error"
   },

   events:{
      async linkAccount({user}){
         await db.user.update({
            where:{id:user.id},
            data:{emailVerified:new Date()}
         })
      }
   },
  callbacks:{


   async signIn({user,account}){

      if(account?.provider !== "credentials") return true; 
       if(!user.id){
         return false;
       }
      const ExistingUser = await getUserById(user.id); 

      if(!ExistingUser || !ExistingUser.emailVerified) return false;


      if(ExistingUser.isTwoFactorEnabled){

         const TwoFactorConfirmation = await  getTwoFactorConfirmationByUserId(ExistingUser.id);
     console.log({TwoFactorConfirmation});
     
         if(!TwoFactorConfirmation){
            return false;
         }
       

         await db.twoFactorConfirmation.delete({
            where:{id:ExistingUser.id}
         })
      }

      return true;

 
   },

  async session({token,session}){
     if(token.sub && session.user ){

     session.user.id = token.sub;
 
  }


  if(token.role && session.user ){

     session.user.role =   token.role as UserRole;

 }
  return session
},

async jwt({token}){ 
   if(!token.sub) return token; 
   const userExist = await getUserById(token.sub); 
   if(!userExist) return token; 
   token.role = userExist.role;  
   return token; 
     
   }
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})