// import authConfig from "./auth.config"
// import NextAuth from "next-auth"
// import { AuthRoutes  ,publicRoutes, apiAuthprefix, DEFAULT_LOGIN_REDIRECT } from "@/route"
 
 
// export const { auth } = NextAuth(authConfig)
// export default auth((req:any) => {
// const {nextUrl,user} = req;
// const isLoggedIn =   !!req.auth  
 
 

// const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
// const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
// const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

 
// if(isApiAuthRoute){
//   return null;
// }

// if(isAuthRoute){
//   if(isLoggedIn){
//     return  Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
//   }
//   return null;
// }


// if(!isLoggedIn && !isPublicRoute){
//   return Response.redirect(new URL("/auth/login",nextUrl)); 
// }
// return null; 


// })

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// }  













import { NextResponse } from "next/server"
import { auth } from "./auth"
import { UserType } from "@prisma/client"
import { AuthRoutes, DEFAULT_LOGIN_REDIRECT, apiAuthprefix, publicRoutes } from "./route"

export default auth((req) => {
  const { nextUrl, auth } = req
  const user = auth?.user
  const url = req.nextUrl.clone();
  const isLoggedIn =   !!req.auth  
 
console.log(user);



  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);
  const isEmployerPage = nextUrl.pathname.startsWith("/hire-talent")
  const isStudentPage = nextUrl.pathname.startsWith("/student")
   if(isApiAuthRoute){
    return null;
  }
  
  if(isAuthRoute){
    if(isLoggedIn){
      if(user?.role as UserType !== "EMPLOYER") {
        url.pathname = "/hire-talent";
      }
      if( user?.role as UserType !== "STUDENT" && user) {
        url.pathname = "/student/dashboard";
      }
    } 
  }
  
  
  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/auth/login",nextUrl)); 
  }
  return null; 
  
  
  })
  // Other protected pages logic can be added here
 
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}