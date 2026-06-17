// app/api/slots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { addDays, startOfDay } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get('serviceId');
  const dateStr = searchParams.get('date');

  if (!serviceId) {
    return NextResponse.json({ error: 'serviceId is required' }, { status: 400 });
  }

  try {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 60);

    const slots = await prisma.slot.findMany({
      where: {
        serviceId,
        isBooked: false,
        date: dateStr
          ? { equals: new Date(dateStr) }
          : { gte: addDays(today, 0), lte: maxDate },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });

    const grouped: Record<string, typeof slots> = {};
    for (const slot of slots) {
      const key = slot.date.toISOString().split('T')[0];
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(slot);
    }

    return NextResponse.json({ slots, grouped });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}
