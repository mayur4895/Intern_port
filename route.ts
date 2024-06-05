
/**
 * public route
 * @type{[string]}
 * 
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/new-password",
    "/hire-talent",
    "/internships", 
    "/api/uploadthing"
     
 
    

]
  
   
/**
 * authRoutes  use for authenticaltion and redirect to defaultredirecturl
 * @type{[string]}
 * 
 */


export const AuthRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset",
    "/auth/error",  
    
 
]

/**
 * authRoutes  use for authenticaltion and redirect to defaultredirecturl
 * @type{string}
 * 
 */

export const apiAuthprefix = "/api/auth"

/**
 *  Default  redirect 
 * @type{string}
 * 
 */


export const DEFAULT_LOGIN_REDIRECT="/"

 
function authMiddleware(arg0: { publicRoutes: string[]; }) {
    throw new Error("Function not implemented.");
}

