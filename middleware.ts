import { UserType } from "@prisma/client";
import { AuthRoutes, apiAuthprefix, publicRoutes } from "./route";
import { auth } from "./auth";

export default auth((req:any,res:any) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);
  
  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (session?.user?.role === UserType.STUDENT) {
        return  res.redirect(new URL("/student/dashboard", nextUrl));
      }
      if (session?.user?.role === UserType.EMPLOYER) {
        return Response.redirect(new URL("/hire-talent/profile", nextUrl));
      }
    }
    return null;
  }

  if (isLoggedIn) {
    if (session?.user.role === UserType.EMPLOYER) {
      if (nextUrl.pathname === '/hire-talent') {
        return Response.redirect(new URL("/hire-talent/profile", nextUrl));
      }

      if (nextUrl.pathname === '/hire-talent/dashboard') {
        if (!session?.user?.companyDetails) {
          return Response.redirect(new URL("/hire-talent/company", nextUrl));
        }

        if (!session?.user?.isPhoneVerified) {
          return Response.redirect(new URL("/hire-talent/profile", nextUrl));
        }
      }

      if (nextUrl.pathname === '/hire-talent/profile') {
        if (session?.user?.companyDetails && session?.user?.isPhoneVerified) {
          return Response.redirect(new URL("/hire-talent/dashboard", nextUrl));
        }
      }

      if (nextUrl.pathname === '/hire-talent/company') {
        if (!session?.user?.isPhoneVerified) {
          return Response.redirect(new URL("/hire-talent/profile", nextUrl));
        }

        if (session?.user?.companyDetails && session?.user?.isPhoneVerified) {
          return Response.redirect(new URL("/hire-talent/dashboard", nextUrl));
        }
      }
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
