import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { AuthRoutes , DEFAULT_LOGIN_REDIRECT ,publicRoutes, apiAuthprefix } from "@/route"
import { redirect } from "next/navigation"
 
export const { auth } = NextAuth(authConfig)
export default auth((req:any) => {
const {nextUrl} = req;
const isLoggedIn =   !!req.auth  

const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

 
if(isApiAuthRoute){
  return null;
}

if(isAuthRoute){
  if(isLoggedIn){
    return  Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
  }
  return null;
}


if(!isLoggedIn && !isPublicRoute){
  return Response.redirect(new URL("/auth/login",nextUrl)); 
}
return null;

 

 
 


})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}  