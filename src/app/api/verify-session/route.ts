// // app/api/auth/verify-session/route.ts
// import { adminAuth } from '@/config/firebase-admin';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { sessionCookie } = await req.json();
//     if (!sessionCookie) {
//       return NextResponse.json({ authenticated: false }, { status: 401 });
//     }
    
//     // Verify the session cookie with the Firebase Admin SDK
//     await adminAuth.verifySessionCookie(sessionCookie, true);

//     return NextResponse.json({ authenticated: true }, { status: 200 });
//   } catch (error) {
//     console.error('Session verification failed:', error);
//     return NextResponse.json({ authenticated: false }, { status: 401 });
//   }
// }


// app/api/auth/verify-session/route.ts
import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/config/firebase-admin'; // lazy init

export async function POST(req: Request) {
  try {
    // Safely parse JSON body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { authenticated: false, error: 'Missing request body' },
        { status: 400 }
      );
    }

    const { sessionCookie } = body;
    if (!sessionCookie) {
      return NextResponse.json(
        { authenticated: false, error: 'No session cookie provided' },
        { status: 401 }
      );
    }

    // Lazy-get adminAuth to avoid build-time JSON.parse errors
    const adminAuth = getAdminAuth();

    // Verify the session cookie with Firebase Admin SDK
    await adminAuth.verifySessionCookie(sessionCookie, true);

    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch (error) {
    console.error('Session verification failed:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
