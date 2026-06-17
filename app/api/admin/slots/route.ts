// app/api/admin/slots/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getAdminFromRequest } from '../../../../lib/auth';

function toLocalDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// GET — fetch slots grouped by date for admin view
export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get('serviceId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!serviceId || !startDate || !endDate) {
    return NextResponse.json({ error: 'serviceId, startDate, endDate required' }, { status: 400 });
  }

  const [sy, sm, sd] = startDate.split('-').map(Number);
  const [ey, em, ed] = endDate.split('-').map(Number);

  const slots = await prisma.slot.findMany({
    where: {
      serviceId,
      date: {
        gte: new Date(sy, sm - 1, sd),
        lte: new Date(ey, em - 1, ed),
      },
    },
    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
  });

  // Group by local date string
  const grouped: Record<string, typeof slots> = {};
  for (const slot of slots) {
    const key = toLocalDateString(slot.date);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(slot);
  }

  return NextResponse.json({ grouped });
}

// POST — create slots for a date
export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { serviceId, date, slots } = await req.json();

  if (!serviceId || !date || !slots?.length) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

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
        update: { endTime: s.endTime, isActive: true },
        create: {
          serviceId,
          date: parsedDate,
          startTime: s.startTime,
          endTime: s.endTime,
          isBooked: false,
          isActive: true,
        },
      })
    )
  );

  return NextResponse.json({ created: created.length });
}

// PATCH — toggle isActive for a single slot
export async function PATCH(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slotId, isActive } = await req.json();
  if (!slotId || typeof isActive !== 'boolean') {
    return NextResponse.json({ error: 'slotId and isActive required' }, { status: 400 });
  }

  const slot = await prisma.slot.findUnique({ where: { id: slotId } });
  if (!slot) return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
  if (slot.isBooked) return NextResponse.json({ error: 'Cannot disable a booked slot' }, { status: 409 });

  const updated = await prisma.slot.update({
    where: { id: slotId },
    data: { isActive },
  });

  return NextResponse.json(updated);
}

// DELETE — single slot or bulk by date range
export async function DELETE(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  // Bulk delete by serviceId + date range
  if (body.serviceId && body.startDate && body.endDate) {
    const { serviceId, startDate, endDate } = body;
    const [sy, sm, sd] = (startDate as string).split('-').map(Number);
    const [ey, em, ed] = (endDate as string).split('-').map(Number);

    const result = await prisma.slot.deleteMany({
      where: {
        serviceId,
        isBooked: false,
        date: {
          gte: new Date(sy, sm - 1, sd),
          lte: new Date(ey, em - 1, ed),
        },
      },
    });

    return NextResponse.json({ deleted: result.count });
  }

  // Single slot delete
  const { slotId } = body;
  if (!slotId) return NextResponse.json({ error: 'Missing slotId' }, { status: 400 });

  const slot = await prisma.slot.findUnique({ where: { id: slotId } });
  if (!slot) return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
  if (slot.isBooked) return NextResponse.json({ error: 'Cannot delete a booked slot' }, { status: 409 });

  await prisma.slot.delete({ where: { id: slotId } });
  return NextResponse.json({ success: true });
}
