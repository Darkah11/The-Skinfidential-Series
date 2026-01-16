import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type UserRole = 'user' | 'admin' | null;

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get('__session')?.value;
  const url = req.nextUrl;
  let userRole: UserRole = 'user';

  const publicPaths = ['/sign-in', '/sign-up'];

  if (publicPaths.includes(url.pathname)) {
    return NextResponse.next();
  }

  // Check for the session cookie
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Use a relative URL to avoid deployment issues
  const apiRoute = new URL('/api/verify-session', req.url);

  try {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionCookie }),
    });
    

    if (response.ok) {
      // If the API route confirms the session is valid, proceed
      userRole = 'admin' as UserRole
    } else {
      // If the API route responds with an error, redirect to login
      console.error('API session verification failed');
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  } catch (error) {
    console.error('Failed to call session verification API:', error);
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (url.pathname.startsWith('/admin') && userRole !== 'admin') {
      // Redirect regular users from admin pages to the home page
      return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}



// Apply the middleware to all routes except the public ones and static assets
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
  ],
}






// middleware.ts (Corrected)
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// type UserRole = 'user' | 'admin' | null;

// export async function middleware(req: NextRequest) {
//   const sessionCookie = req.cookies.get('__session')?.value;
//   const { pathname } = req.nextUrl;
  
//   const publicPaths = ['/sign-in', '/sign-up', '/']; // Added '/' as public in this case

//   // 1. Allow access to public paths without any checks
//   if (publicPaths.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // 2. Check for the session cookie for all non-public pages
//   if (!sessionCookie) {
//     return NextResponse.redirect(new URL('/sign-in', req.url));
//   }

//   // 3. Verify the session and get the user's role from the API
//   const apiRoute = new URL('/api/verify-session', req.url);
//   let userRole: UserRole = null; // Initialize role

//   try {
//     const response = await fetch(apiRoute, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionCookie }),
//     });
    
//     if (response.ok) {
//       const data = await response.json();
//       // !!! CRITICAL STEP: Get the actual role from the API response !!!
//       userRole = 'user' as UserRole; 
//     } else {
//       console.error('API session verification failed');
//       return NextResponse.redirect(new URL('/sign-in', req.url));
//     }
//   } catch (error) {
//     console.error('Failed to call session verification API:', error);
//     return NextResponse.redirect(new URL('/sign-in', req.url));
//   }

//   // 4. Perform role-based access control (RBAC) AFTER verification
//   if (pathname.startsWith('/admin') && userRole !== 'admin') {
//       // Redirect regular users from admin pages to the home page
//       return NextResponse.redirect(new URL('/', req.url));
//   }

//   // 5. If all checks pass, allow the request to proceed
//   return NextResponse.next();
// }


// // Apply the middleware to all routes except the specified public ones and static assets
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
//   ],
// }

