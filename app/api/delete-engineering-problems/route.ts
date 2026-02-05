import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * DELETE ALL ENGINEERING PROBLEMS ONLY
 * Does NOT touch English questions
 */
export async function GET() {
  try {
    console.log('🗑️  Deleting ALL engineering problems...');

    const deleted = await prisma.problem.deleteMany({
      where: {
        topic: {
          unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
        }
      }
    });

    console.log(`✅ Deleted ${deleted.count} engineering problems`);

    return NextResponse.json({
      success: true,
      message: `Deleted ${deleted.count} engineering problems. English questions untouched.`,
      deleted: deleted.count,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
