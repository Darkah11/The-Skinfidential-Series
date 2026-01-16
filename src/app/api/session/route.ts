// import { NextResponse } from 'next/server';
// import { adminAuth } from '@/config/firebase-admin';

// export async function POST(req: Request) {
//   const { idToken, rememberMe } = await req.json();

//   const THIRTY_DAYS_IN_MS = 60 * 60 * 24 * 14 * 1000;
//   const FIVE_Hours_IN_MS = 60 * 60 * 5 * 1000;
//   const expiresIn = rememberMe ? THIRTY_DAYS_IN_MS : FIVE_Hours_IN_MS;

//   const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
//   const response = NextResponse.json({ success: true });

//   response.cookies.set({
//     name: '__session',
//     value: sessionCookie,
//     maxAge: expiresIn / 1000,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//   });

//   return response;
// }


import { NextResponse } from 'next/server';
import { adminAuth } from '@/config/firebase-admin';

export async function POST(req: Request) {
  try {
    // Parse JSON safely
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Request body is missing' },
        { status: 400 }
      );
    }

    const { idToken, rememberMe } = body;

    if (!idToken) {
      return NextResponse.json(
        { success: false, error: 'idToken is required' },
        { status: 400 }
      );
    }

    const THIRTY_DAYS_IN_MS = 60 * 60 * 24 * 30 * 1000;
    const FIVE_HOURS_IN_MS = 60 * 60 * 5 * 1000;
    const expiresIn = rememberMe ? THIRTY_DAYS_IN_MS : FIVE_HOURS_IN_MS;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: '__session',
      value: sessionCookie,
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Error in /api/session:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
