import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const units = await prisma.unit.findMany({
      include: {
        topics: {
          orderBy: { order: 'asc' },
          include: {
            problems: true,
            progress: {
              where: { userId: session.userId },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ units });
  } catch (error) {
    console.error('Error fetching units:', error);
    return NextResponse.json(
      { error: 'Failed to fetch units' },
      { status: 500 }
    );
  }
}
