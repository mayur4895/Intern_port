import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, UserRole } from "@prisma/client"
import authConfig from "./auth.config"
import { getUserById } from "./data/user" 
const prisma = new PrismaClient()
 
export const { handlers, auth ,signIn,signOut} = NextAuth({

  callbacks:{


   // async signIn({user}){
   //     if(!user.id){
   //       return false;
   //     }
   //    const ExistingUser = await getUserById(user.id); 

   //    if(!ExistingUser || !ExistingUser.emailVerified) return false;

   //    return true;

 
   // },

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