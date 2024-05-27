import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { AuthRoutes, publicRoutes, apiAuthprefix, DEFAULT_LOGIN_REDIRECT } from "@/route"
import { UserType } from "@prisma/client"
import { NextResponse } from "next/server"
import next from "next"

export const { auth } = NextAuth(authConfig)

export default auth((req: any) => {
  const { nextUrl, user } = req;
  const isLoggedIn = !!req.auth;
  const session = req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname); 
 
 
 
  if (isApiAuthRoute) {
    return null;  
  }

  if (isAuthRoute ) {
      
 if(isLoggedIn){
  if(isLoggedIn && session?.role  === UserType.STUDENT ){
    return Response.redirect(new URL("/student/dashboard", nextUrl));
  }
  if(isLoggedIn && session?.role  === UserType.EMPLOYER ){
    return Response.redirect(new URL("/hire-talent/profile", nextUrl));
  }
 }
 return null;
    } 
    
    
  if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/auth/login", nextUrl));
 }
  
    return null;  
  
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
