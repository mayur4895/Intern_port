import { UserType } from "@prisma/client";
import { AuthRoutes, apiAuthprefix, publicRoutes } from "./route";
import { auth } from "./auth";

export default auth((req: any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }



  if (nextUrl.pathname === "/student/dashboard") {
    if (isLoggedIn && session?.user?.role === UserType.STUDENT) {
   return null;
    } else {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
  }

 
  if (nextUrl.pathname === "/hire-talent/dashboard") {
    if (isLoggedIn && session?.user?.role === UserType.EMPLOYER) {
      if (!session?.user?.isPhoneVerified) {
        return Response.redirect(new URL("/hire-talent/profile", nextUrl));
      }
      if (!session?.user?.companyDetails) {
        return Response.redirect(new URL("/hire-talent/company", nextUrl));
      }
      return null;
    } else {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (session?.user?.role === UserType.EMPLOYER) {
        if (!session?.user?.isPhoneVerified) {
          return Response.redirect(new URL("/hire-talent/profile", nextUrl));
        }
        if (!session?.user?.companyDetails) {
          return Response.redirect(new URL("/hire-talent/company", nextUrl));
        }
        if (session.user.companyDetails && session.user.isPhoneVerified) {
          return Response.redirect(new URL("/hire-talent/dashboard", nextUrl));
        }
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
