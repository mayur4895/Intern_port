import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"

const prisma = new PrismaClient()
 
export const { handlers, auth ,signIn,signOut} = NextAuth({

  callbacks:{


  async session({token,session}){
     if(token.sub && session.user ){

     session.user.id = token.sub;
 
  }


  if(token.role && session.user ){

     session.user.role = "ADMIN";

 }
  return session
},

   async jwt({token}){
 
    if(!token.sub ) return token;
    const exsitingUser = getUserById(token.sub)

    if(!exsitingUser) return token;

    token.role ="sii";


    return token;
   }
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})