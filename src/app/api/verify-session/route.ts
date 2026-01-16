// app/api/auth/verify-session/route.ts
import { adminAuth } from '@/config/firebase-admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sessionCookie } = await req.json();
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    // Verify the session cookie with the Firebase Admin SDK
    await adminAuth.verifySessionCookie(sessionCookie, true);

    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch (error) {
    console.error('Session verification failed:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
