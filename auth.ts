import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient,  UserType } from "@prisma/client"
import authConfig from "./auth.config"
import { getUserById } from "./data/user" 
import { db } from "./lib/db" 
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
const prisma = new PrismaClient()
 
export const { handlers, auth ,signIn,signOut} = NextAuth({
   pages:{
      signIn:"/auth/login",
      error:"/auth/error",
      signOut:"/"
       
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


   async signIn({user,account,profile, email, credentials}){

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
     session.user.phone = token.phone
     if(UserType.EMPLOYER == token.role ){
      session.user.designation = token?.designation
      session.user.isphoneVerified = token?.isphoneVerified
     } 
  }


  if(token.role && session.user ){ 
     session.user.role =  token.role as UserType; 
     session.user.phone = token?.phone
     if(UserType.EMPLOYER == token.role ){
      session.user.designation = token?.designation
      session.user.isphoneVerified = token?.isphoneVerified
     } 
 
 }
  return session
},

async jwt({token}){ 
   if(!token.sub) return token; 
   const userExist = await getUserById(token.sub); 
   if(!userExist) return token; 
   token.role = userExist.role;  
   token.phone = userExist.phone
  if(userExist.role == UserType.EMPLOYER){
   token.designation = userExist.designation
   token.isphoneVerified = userExist?.isphoneVerified
  }
   return token;  
   }
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})