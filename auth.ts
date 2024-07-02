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
   callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if (account?.provider !== "credentials") return true;
  
        if (!user.id) {
          return false;
        }
 
         const existingUser = await getUserById(user.id);
  
        if (!existingUser || !existingUser.emailVerified) return false;
  
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
  
          if (!twoFactorConfirmation) {
            return false;
          }
  
          await db.twoFactorConfirmation.delete({
            where: { id: existingUser.id },
          });
        }
  
        return true;
      },
  
      async session({ token,  session }) {
      if (session.user) {
        session.user.role = token.role; 
        session.user.companyDetails = token.companyDetails; 
        session.user.phone = token.phone 
        session.user.id = token.id
        session.user.isPhoneVerified =  token.phoneverified
      }
      return session
    },
  
      async jwt({ token }) {
        if (!token.sub) return token;
        const userExist = await getUserById(token.sub);
        if (!userExist) return token;
        token.role = userExist.role;
        token.phone = userExist.phone;
        token.phoneverified = userExist.isPhoneVerified as boolean;
        if (userExist.role == UserType.EMPLOYER) {
          token.id = token.sub;
          token.designation = userExist.designation; 
          token.companyDetails = userExist.companyDetails
          token.phoneverified = userExist.isPhoneVerified as boolean;
        }
        return token;
      },
    },
  
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
  });