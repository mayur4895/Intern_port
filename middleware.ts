import { UserType } from "@prisma/client";
import { AuthRoutes, apiAuthprefix, publicRoutes } from "./route";
import { auth } from "./auth";
import { NextResponse } from 'next/server';

export default auth((req: any, res: any) => {
  try {
    const { nextUrl } = req;
    const session = req.auth;
    const isLoggedIn = !!session;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        if (session?.user?.role === UserType.STUDENT) {
          return NextResponse.redirect(new URL("/student/profile", nextUrl));
        }
        if (session?.user?.role === UserType.EMPLOYER) {
          return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
        }
      }
      return NextResponse.next();
    }

    if (isLoggedIn) {
      const userRole = session?.user?.role;
      const userCompanyDetails = session?.user?.companyDetails;
      const isPhoneVerified = session?.user?.isPhoneVerified;
      const userProfileDetails = session?.user?.studentProfileDetails;

      // Restrict students from accessing employer routes
      if (userRole === UserType.STUDENT) {
        if (nextUrl.pathname.startsWith('/hire-talent')) {
          return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
        }
      }

      // Restrict employers from accessing student routes
      if (userRole === UserType.EMPLOYER) {
        if (nextUrl.pathname.startsWith('/student')) {
          return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
        }

        if (nextUrl.pathname === '/hire-talent') {
          return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
        }

        if (nextUrl.pathname === '/hire-talent/dashboard') {
          if (!userCompanyDetails) {
            return NextResponse.redirect(new URL("/hire-talent/company", nextUrl));
          }
          if (!isPhoneVerified) {
            return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
          }
        }

        if (nextUrl.pathname === '/hire-talent/profile') {
          if (userCompanyDetails && isPhoneVerified) {
            return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
          }
        }

        if (nextUrl.pathname === '/hire-talent/company') {
          if (!isPhoneVerified) {
            return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
          }
          if (userCompanyDetails && isPhoneVerified) {
            return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
          }
        }

         
      }

      if (userRole === UserType.STUDENT) {
        if (nextUrl.pathname === '/student/dashboard') {
          if (!userProfileDetails) {
            return NextResponse.redirect(new URL("/student/profile", nextUrl));
          }
        }

        if (nextUrl.pathname === '/student/profile') {
          if (userProfileDetails) {
            return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
          }
        }


        
      }
    }

    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.error();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
