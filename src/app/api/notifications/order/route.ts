import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { orderConfirmationEmail, adminOrderAlertEmail } from "@/lib/email-templates";
import type { Order } from "@/lib/types";

// POST — send order confirmation (customer) + admin alert
export async function POST(request: NextRequest) {
  try {
    const { order, customerEmail } = (await request.json()) as {
      order: Order;
      customerEmail?: string;
    };

    if (!order || !order.orderNumber) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const results: { customer: boolean; admin: boolean } = { customer: false, admin: false };

    // Send customer confirmation if email provided
    if (customerEmail) {
      const customerEmailData = orderConfirmationEmail(order);
      results.customer = await sendEmail({
        to: customerEmail,
        subject: customerEmailData.subject,
        html: customerEmailData.html,
      });
    }

    // Always send admin alert
    const adminEmailData = adminOrderAlertEmail(order);
    results.admin = await sendEmail({
      to: adminEmailData.recipient,
      subject: adminEmailData.subject,
      html: adminEmailData.html,
    });

    return NextResponse.json({
      success: true,
      results,
      message: "Order notifications processed",
    });
  } catch (error) {
    console.error("[API] Order notification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
