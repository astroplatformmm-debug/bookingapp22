// app/api/payments/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getRazorpayInstance } from '../../../../lib/razorpay';
import { Prisma } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, slotId, customerName, customerEmail, customerPhone, notes } = body;

    if (!serviceId || !slotId || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(customerPhone.replace(/\D/g, '').slice(-10))) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const slot = await tx.slot.findUnique({
        where: { id: slotId },
        include: { service: true },
      });

      if (!slot) throw new Error('Slot not found');
      if (slot.serviceId !== serviceId) throw new Error('Slot/service mismatch');
      if (slot.isBooked) throw new Error('Slot is already booked');

      const service = await tx.service.findUnique({ where: { id: serviceId } });
      if (!service || !service.active) throw new Error('Service not available');

      const razorpay = getRazorpayInstance();
      const order = await razorpay.orders.create({
        amount: service.price,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          slotId,
          serviceId,
          customerEmail,
          customerName,
        },
      });

      const booking = await tx.booking.create({
        data: {
          slotId,
          serviceId,
          customerName,
          customerEmail,
          customerPhone,
          notes: notes || null,
          status: 'PENDING',
          paymentStatus: 'UNPAID',
          orderId: order.id,
          amountPaid: service.price,
        },
      });

      return {
        orderId: order.id,
        amount: service.price,
        currency: 'INR',
        bookingId: booking.id,
        serviceName: service.name,
        customerName,
        customerEmail,
        customerPhone,
      };
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Order creation error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create order';
    const status = message.includes('already booked') ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
