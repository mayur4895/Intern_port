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

    // Allow API auth routes and uploadthing routes to proceed
    if (isApiAuthRoute || isUploadthingRoute) {
      return NextResponse.next();
    }

    // Handle Authentication Routes
    if (isAuthRoute) {
      if (isLoggedIn) {
        if (session.user.role === UserType.STUDENT) {
          return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
        }
        if (session.user.role === UserType.EMPLOYER) {
          return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
        }
      }
      return NextResponse.next();
    }

    // Handle Logged-In User Routes
    if (isLoggedIn) {
      const { role, studentProfileDetails, companyDetails, isPhoneVerified } = session.user;

      if (role === UserType.EMPLOYER) {
        if (nextUrl.pathname.startsWith('/hire-talent')) {

          if (companyDetails && nextUrl.pathname == '/hire-talent/company') {
            return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
          }

          if (!isPhoneVerified && nextUrl.pathname !== '/hire-talent/profile') {
            return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
          }

          if(!companyDetails &&  nextUrl.pathname !== '/hire-talent/company' ){
            return NextResponse.redirect(new URL("/hire-talent/comapny", nextUrl));
          }

          if (companyDetails && isPhoneVerified && nextUrl.pathname !== '/hire-talent/dashboard') {
            return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
          }

          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
        }
      }

      if (role === UserType.STUDENT) {
        if (nextUrl.pathname.startsWith('/student')) {
         

          if (studentProfileDetails && nextUrl.pathname == '/student/profile') {
            return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
          }

          if (!studentProfileDetails && nextUrl.pathname == '/student/dahboard' ) {
            return NextResponse.redirect(new URL("/student/profile", nextUrl));
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
