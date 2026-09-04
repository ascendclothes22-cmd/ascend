import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import {
  orderConfirmationEmail,
  adminOrderAlertEmail,
  orderStatusUpdateEmail,
  lowStockAlertEmail,
  contactFormEmail,
} from "@/lib/email-templates";
import type { Order, Product } from "@/lib/types";

// In-memory notification log (in production, use Supabase)
interface Notification {
  id: string;
  type: string;
  subject: string;
  recipient: string;
  status: "sent" | "failed" | "pending";
  createdAt: string;
  orderId?: string;
}

const notifications: Notification[] = [];

// GET — list notifications
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const limit = Number(searchParams.get("limit")) || 50;

  let filtered = [...notifications];
  if (type) {
    filtered = filtered.filter((n) => n.type === type);
  }

  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({
    notifications: filtered.slice(0, limit),
    total: filtered.length,
  });
}

// POST — send a notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let emailResult: { subject: string; html: string; recipient?: string } | null = null;

    switch (type) {
      case "order_confirmation": {
        const order = data as Order;
        emailResult = orderConfirmationEmail(order);
        break;
      }
      case "admin_order_alert": {
        const order = data as Order;
        emailResult = adminOrderAlertEmail(order);
        break;
      }
      case "order_status_update": {
        const { order, oldStatus, newStatus } = data as {
          order: Order;
          oldStatus: string;
          newStatus: string;
        };
        emailResult = orderStatusUpdateEmail(order, oldStatus, newStatus);
        break;
      }
      case "low_stock_alert": {
        const products = data as Product[];
        emailResult = lowStockAlertEmail(products);
        break;
      }
      case "contact_form": {
        const formData = data as { name: string; email: string; subject: string; message: string };
        emailResult = contactFormEmail(formData);
        break;
      }
      default:
        return NextResponse.json({ error: "Unknown notification type" }, { status: 400 });
    }

    if (!emailResult) {
      return NextResponse.json({ error: "Failed to generate email" }, { status: 500 });
    }

    const recipient = emailResult.recipient || data.customerEmail || "unknown@example.com";
    const sent = await sendEmail({
      to: recipient,
      subject: emailResult.subject,
      html: emailResult.html,
    });

    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      subject: emailResult.subject,
      recipient,
      status: sent ? "sent" : "failed",
      createdAt: new Date().toISOString(),
      orderId: data.orderNumber,
    };

    notifications.unshift(notification);

    // Also send admin alert for new orders
    if (type === "order_confirmation" && sent) {
      const adminEmail = adminOrderAlertEmail(data as Order);
      await sendEmail({
        to: adminEmail.recipient,
        subject: adminEmail.subject,
        html: adminEmail.html,
      });

      notifications.unshift({
        id: `notif-${Date.now()}-admin`,
        type: "admin_order_alert",
        subject: adminEmail.subject,
        recipient: adminEmail.recipient,
        status: "sent",
        createdAt: new Date().toISOString(),
        orderId: (data as Order).orderNumber,
      });
    }

    return NextResponse.json({
      success: sent,
      notification,
      message: sent ? "Email sent successfully" : "Email sending failed (SMTP may not be configured)",
    });
  } catch (error) {
    console.error("[API] Notification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
