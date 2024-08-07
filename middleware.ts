import { UserType } from "@prisma/client";
import { AuthRoutes, apiAuthprefix, publicRoutes } from "./route";
import { auth } from "./auth";
import { NextResponse } from 'next/server';

const uploadthingRoutes = [
  "/api/uploadthing",
  "/api/uploadthing/callback",
 
];

export default auth((req, res) => {
  try {
    const { nextUrl } = req;
    const session = req.auth;
    const isLoggedIn = !!session;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);
    const isUploadthingRoute = uploadthingRoutes.includes(nextUrl.pathname);

    // Allow API auth routes to proceed
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // Exclude `uploadthing` routes from middleware
    if (isUploadthingRoute) {
      return NextResponse.next();
    }

    // Check authentication routes
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

    // Check if user is logged in
    if (isLoggedIn) {
      // Employer-specific routes
      if (session?.user.role === UserType.EMPLOYER) {
        if (nextUrl.pathname.startsWith('/hire-talent')) {
          if (nextUrl.pathname === '/hire-talent') {
            return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
          }

          if (nextUrl.pathname === '/hire-talent/dashboard') {
            if (!session?.user?.companyDetails) {
              return NextResponse.redirect(new URL("/hire-talent/company", nextUrl));
            }

            if (!session?.user?.isPhoneVerified) {
              return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
            }
          }

          if (nextUrl.pathname === '/hire-talent/profile') {
            if (session?.user?.companyDetails && session?.user?.isPhoneVerified) {
              return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
            }
          }

          if (nextUrl.pathname === '/hire-talent/company') {
            if (!session?.user?.isPhoneVerified) {
              return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
            }

            if (session?.user?.companyDetails && session?.user?.isPhoneVerified) {
              return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
            }
          }

          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
        }
      }

      // Student-specific routes
      if (session?.user.role === UserType.STUDENT) {
        if (nextUrl.pathname.startsWith('/student')) {
          if (nextUrl.pathname === '/student/dashboard') {
            if (!session?.user?.studentProfileDetails) {
              return NextResponse.redirect(new URL("/student/profile", nextUrl));
            }
          }

          if (nextUrl.pathname === '/student/profile') {
            if (session?.user?.studentProfileDetails) {
              return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
            }
          }

          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
        }
      }
    }

    // If the user is not logged in and trying to access a non-public route
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
