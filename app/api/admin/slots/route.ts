// app/api/admin/slots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getAdminFromRequest } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { serviceId, date, slots } = await req.json();

  if (!serviceId || !date || !slots?.length) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Parse date as local midnight to avoid UTC shift
  const [y, m, d] = (date as string).split('-').map(Number);
  const parsedDate = new Date(y, m - 1, d);

  const created = await prisma.$transaction(
    slots.map((s: { startTime: string; endTime: string }) =>
      prisma.slot.upsert({
        where: {
          serviceId_date_startTime: {
            serviceId,
            date: parsedDate,
            startTime: s.startTime,
          },
        },
        update: { endTime: s.endTime }, // FIX: update endTime so re-creating with new duration actually changes existing slots
        create: {
          serviceId,
          date: parsedDate,
          startTime: s.startTime,
          endTime: s.endTime,
          isBooked: false,
        },
      })
    )
  );

  return NextResponse.json({ created: created.length });
}

// Single slot delete (existing)
export async function DELETE(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  // Bulk delete by serviceId + date range (new)
  if (body.serviceId && body.startDate && body.endDate) {
    const { serviceId, startDate, endDate } = body;

    const [sy, sm, sd] = (startDate as string).split('-').map(Number);
    const [ey, em, ed] = (endDate as string).split('-').map(Number);
    const start = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);

    // Only delete unbooked slots
    const result = await prisma.slot.deleteMany({
      where: {
        serviceId,
        isBooked: false,
        date: { gte: start, lte: end },
      },
    });

    return NextResponse.json({ deleted: result.count });
  }

  // Single slot delete
  const { slotId } = body;
  if (!slotId) return NextResponse.json({ error: 'Missing slotId or bulk delete params' }, { status: 400 });

  const slot = await prisma.slot.findUnique({ where: { id: slotId } });
  if (!slot) return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
  if (slot.isBooked) return NextResponse.json({ error: 'Cannot delete a booked slot' }, { status: 409 });

  await prisma.slot.delete({ where: { id: slotId } });
  return NextResponse.json({ success: true });
}
