import { UserType } from "@prisma/client";
import { AuthRoutes, apiAuthprefix, publicRoutes } from "./route";
import { auth } from "./auth";
import { NextRequest, NextResponse } from 'next/server';

const uploadthingRoutes = [
  "/api/uploadthing",
  "/api/uploadthing/callback",
];

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session?.user;  // Check if session and user exist

  console.log("Session:", session);  // Keep this for debugging

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);
  const isUploadthingRoute = uploadthingRoutes.includes(nextUrl.pathname);

  // Allow API routes and upload routes
  if (isApiAuthRoute || isUploadthingRoute || nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Handle Auth Routes
  if (isAuthRoute) {
    if (isLoggedIn && session.user.role) {
      if (session.user.role === UserType.STUDENT) {
        return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
      } 
      if (session.user.role === UserType.EMPLOYER) {
        return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
      }
    }
    return NextResponse.next();
  }

  // Handle logged-in routes
  if (isLoggedIn && session.user.role) {
    const { role, studentProfileDetails, companyDetails, isPhoneVerified } = session.user;

    if (role === UserType.EMPLOYER) {
      if (nextUrl.pathname.startsWith('/hire-talent')) {
        // Redirect to company page if companyDetails are missing and phone is verified
        if (!isPhoneVerified) {
          // If phone is not verified, redirect to profile page for verification
          return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
        }

        if (nextUrl.pathname === '/hire-talent/company') {
          if (companyDetails) {
            return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
          }
        }
        
        if (nextUrl.pathname === '/hire-talent' && !companyDetails) {
          return NextResponse.redirect(new URL("/hire-talent/company", nextUrl));
        }
        
        if (nextUrl.pathname === '/hire-talent/dashboard') {
          if (!companyDetails) {
            return NextResponse.redirect(new URL("/hire-talent/company", nextUrl));
          }
          if (!isPhoneVerified) {
            return NextResponse.redirect(new URL("/hire-talent/profile", nextUrl));
          }
        }

        if (nextUrl.pathname === '/hire-talent/profile') {
          if (companyDetails && isPhoneVerified) {
            return NextResponse.redirect(new URL("/hire-talent/dashboard/new-post", nextUrl));
          }
        }

        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/hire-talent/dashboard", nextUrl));
      }
    }

    if (role === UserType.STUDENT) {
      if (nextUrl.pathname.startsWith('/student')) {
        if (nextUrl.pathname === '/student/profile' && studentProfileDetails) {
          return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
        }

        if (nextUrl.pathname === '/student/dashboard' && !studentProfileDetails) {
          return NextResponse.redirect(new URL("/student/profile", nextUrl));
        }

        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/student/dashboard", nextUrl));
      }
    }
  }

  // If the user is not logged in and the route is not public, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}) as any;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
