// middleware.ts
import { auth } from "@/auth"
 
export default auth((req) => {
  const isLoggedIn = Boolean(req.auth)
  console.log("isLoggedIn",isLoggedIn)
  const isAuthenticatedRoute = req.nextUrl.pathname.startsWith('/dashboard') || 
                              req.nextUrl.pathname.startsWith('/feedback') 
  
  if (isAuthenticatedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/', req.nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}