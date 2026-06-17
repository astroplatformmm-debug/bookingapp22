// app/api/slots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { addDays, startOfDay } from 'date-fns';

export const dynamic = 'force-dynamic';

function toLocalDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

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
        isActive: true,   // only show active slots to public
        date: dateStr
          ? { equals: new Date(dateStr) }
          : { gte: today, lte: maxDate },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });

    const grouped: Record<string, typeof slots> = {};
    for (const slot of slots) {
      const key = toLocalDateString(slot.date);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(slot);
    }

    return NextResponse.json({ slots, grouped });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}
