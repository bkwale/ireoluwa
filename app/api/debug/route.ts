import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      hasDbUrl: !!process.env.DATABASE_URL,
      hasAuthToken: !!process.env.DATABASE_AUTH_TOKEN,
      hasSessionSecret: !!process.env.SESSION_SECRET,
      dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 20),
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
