import { formatPrice } from "./utils";
import type { Order, Product } from "./types";

const baseStyles = `
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #0A0A0A;
  color: #F5F5F5;
`;

const containerStyles = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #0A0A0A;
  border: 1px solid rgba(255,255,255,0.05);
`;

const headerStyles = `
  padding: 32px 24px;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
`;

const bodyStyles = `
  padding: 32px 24px;
`;

const accentColor = "#FF6A00";
const grayColor = "#8A8A8A";
const borderColor = "rgba(255,255,255,0.08)";

function baseEmailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="${baseStyles}">
  <div style="padding: 24px 16px; background-color: #0A0A0A;">
    <div style="${containerStyles}">
      <!-- Header -->
      <div style="${headerStyles}">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 8px; color: #F5F5F5;">
          ASCEND
        </h1>
        <p style="margin: 4px 0 0; font-size: 9px; letter-spacing: 4px; color: ${accentColor}; text-transform: uppercase;">
          FORGED IN PRESSURE
        </p>
      </div>

      <!-- Body -->
      <div style="${bodyStyles}">
        ${content}
      </div>

      <!-- Footer -->
      <div style="padding: 24px; text-align: center; border-top: 1px solid ${borderColor};">
        <p style="margin: 0 0 8px; font-size: 12px; color: ${grayColor};">
          ASCEND — Premium Streetwear
        </p>
        <p style="margin: 0; font-size: 11px; color: rgba(138,138,138,0.5);">
          Forged In Pressure. Built For The Relentless.
        </p>
        <div style="margin-top: 16px;">
          <a href="https://instagram.com/ascend" style="color: ${grayColor}; text-decoration: none; font-size: 11px; margin: 0 8px;">Instagram</a>
          <a href="https://tiktok.com/@ascend" style="color: ${grayColor}; text-decoration: none; font-size: 11px; margin: 0 8px;">TikTok</a>
          <a href="https://facebook.com/ascend" style="color: ${grayColor}; text-decoration: none; font-size: 11px; margin: 0 8px;">Facebook</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function orderConfirmationEmail(order: Order): { subject: string; html: string } {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 4);
  const deliveryDateStr = estimatedDelivery.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${borderColor};">
            <p style="margin: 0; font-size: 14px; font-weight: 600; color: #F5F5F5;">
              ${item.productName}
            </p>
            <p style="margin: 4px 0 0; font-size: 12px; color: ${grayColor};">
              ${item.size} / ${item.color} × ${item.quantity}
            </p>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${borderColor}; text-align: right;">
            <span style="font-size: 14px; font-weight: 600; color: ${accentColor};">
              ${formatPrice(item.price * item.quantity)}
            </span>
          </td>
        </tr>`
    )
    .join("");

  const html = baseEmailShell(`
    <!-- Title -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="display: inline-block; width: 64px; height: 64px; border-radius: 50%; background-color: rgba(255,106,0,0.1); margin-bottom: 16px; line-height: 64px;">
        <span style="font-size: 28px; color: ${accentColor};">&#10003;</span>
      </div>
      <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #F5F5F5;">
        Order Confirmed
      </h2>
      <p style="margin: 0; font-size: 14px; color: ${grayColor};">
        Thank you for joining the ASCEND movement.
      </p>
    </div>

    <!-- Order Number -->
    <div style="background-color: rgba(255,255,255,0.03); border: 1px solid ${borderColor}; padding: 20px; margin-bottom: 24px; text-align: center;">
      <p style="margin: 0 0 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor};">
        Order Number
      </p>
      <p style="margin: 0; font-size: 22px; font-weight: 700; color: ${accentColor}; letter-spacing: 2px;">
        ${order.orderNumber}
      </p>
    </div>

    <!-- Order Details -->
    <div style="margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Payment</td>
          <td style="padding: 8px 0; font-size: 14px; color: #F5F5F5; text-align: right;">Cash on Delivery</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Estimated Delivery</td>
          <td style="padding: 8px 0; font-size: 14px; color: #F5F5F5; text-align: right;">${deliveryDateStr}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Status</td>
          <td style="padding: 8px 0; text-align: right;">
            <span style="display: inline-block; padding: 4px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${accentColor}; background-color: rgba(255,106,0,0.1); border: 1px solid rgba(255,106,0,0.2);">
              Pending
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Items -->
    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; font-weight: 600;">
        Order Items
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        ${itemsHtml}
      </table>
    </div>

    <!-- Total -->
    <div style="border-top: 1px solid ${borderColor}; padding-top: 16px; margin-bottom: 24px;">
      <table style="width: 100%;">
        <tr>
          <td style="font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Shipping</td>
          <td style="font-size: 14px; color: #4CAF50; text-align: right;">Free</td>
        </tr>
        <tr>
          <td style="padding-top: 12px; font-size: 16px; font-weight: 700; color: #F5F5F5;">Total</td>
          <td style="padding-top: 12px; font-size: 18px; font-weight: 700; color: ${accentColor}; text-align: right;">${formatPrice(order.total)}</td>
        </tr>
      </table>
    </div>

    <!-- Delivery Address -->
    <div style="background-color: rgba(255,255,255,0.03); border: 1px solid ${borderColor}; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; font-weight: 600;">
        Delivery Address
      </p>
      <p style="margin: 0; font-size: 14px; color: #F5F5F5;">${order.customerName}</p>
      <p style="margin: 4px 0 0; font-size: 13px; color: ${grayColor};">${order.address}, ${order.city}</p>
      <p style="margin: 4px 0 0; font-size: 13px; color: ${grayColor};">${order.phone}</p>
      ${order.notes ? `<p style="margin: 8px 0 0; font-size: 12px; color: ${accentColor};">Note: ${order.notes}</p>` : ""}
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 8px;">
      <a href="https://ascend.com/track-order" style="display: inline-block; padding: 14px 32px; background-color: ${accentColor}; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
        Track Your Order
      </a>
    </div>
    <p style="text-align: center; font-size: 12px; color: ${grayColor};">
      You'll receive a confirmation call shortly.
    </p>
  `);

  return {
    subject: `Order Confirmed — ${order.orderNumber}`,
    html,
  };
}

export function adminOrderAlertEmail(order: Order): { subject: string; html: string; recipient: string } {
  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid ${borderColor}; font-size: 13px; color: #F5F5F5;">
            ${item.productName} (${item.size} / ${item.color}) × ${item.quantity}
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid ${borderColor}; text-align: right; font-size: 13px; color: ${accentColor};">
            ${formatPrice(item.price * item.quantity)}
          </td>
        </tr>`
    )
    .join("");

  const html = baseEmailShell(`
    <!-- Title -->
    <div style="text-align: center; margin-bottom: 28px;">
      <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #F5F5F5;">
        New Order Received
      </h2>
      <p style="margin: 0; font-size: 13px; color: ${grayColor};">
        A new COD order has been placed on your store.
      </p>
    </div>

    <!-- Order Badge -->
    <div style="background-color: rgba(255,106,0,0.08); border: 1px solid rgba(255,106,0,0.2); padding: 16px; margin-bottom: 24px; text-align: center;">
      <p style="margin: 0 0 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor};">Order</p>
      <p style="margin: 0; font-size: 20px; font-weight: 700; color: ${accentColor}; letter-spacing: 2px;">
        ${order.orderNumber}
      </p>
    </div>

    <!-- Customer Info -->
    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; font-weight: 600;">
        Customer Details
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Name</td>
          <td style="padding: 8px 0; font-size: 14px; color: #F5F5F5; text-align: right;">${order.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
          <td style="padding: 8px 0; font-size: 14px; color: #F5F5F5; text-align: right;">${order.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">City</td>
          <td style="padding: 8px 0; font-size: 14px; color: #F5F5F5; text-align: right;">${order.city}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Address</td>
          <td style="padding: 8px 0; font-size: 13px; color: ${grayColor}; text-align: right;">${order.address}</td>
        </tr>
        ${order.notes ? `
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Notes</td>
          <td style="padding: 8px 0; font-size: 13px; color: ${accentColor}; text-align: right;">${order.notes}</td>
        </tr>` : ""}
      </table>
    </div>

    <!-- Items -->
    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; font-weight: 600;">
        Order Items
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        ${itemsHtml}
      </table>
    </div>

    <!-- Total -->
    <div style="border-top: 1px solid ${borderColor}; padding-top: 16px; text-align: right; margin-bottom: 24px;">
      <span style="font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Total: </span>
      <span style="font-size: 20px; font-weight: 700; color: ${accentColor};">${formatPrice(order.total)}</span>
    </div>

    <!-- CTA -->
    <div style="text-align: center;">
      <a href="https://ascend.com/admin" style="display: inline-block; padding: 14px 32px; background-color: ${accentColor}; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
        View in Admin Panel
      </a>
    </div>
  `);

  return {
    subject: `New Order: ${order.orderNumber} — ${formatPrice(order.total)}`,
    html,
    recipient: process.env.ADMIN_EMAIL || "admin@ascend.com",
  };
}

export function orderStatusUpdateEmail(
  order: Order,
  oldStatus: string,
  newStatus: string
): { subject: string; html: string } {
  const statusMessages: Record<string, { title: string; message: string; color: string }> = {
    confirmed: {
      title: "Order Confirmed",
      message: "Your order has been confirmed and is being prepared.",
      color: accentColor,
    },
    shipped: {
      title: "Order Shipped",
      message: "Great news! Your order is on its way to you.",
      color: "#2196F3",
    },
    delivered: {
      title: "Order Delivered",
      message: "Your order has been delivered. Thank you for choosing ASCEND!",
      color: "#4CAF50",
    },
    cancelled: {
      title: "Order Cancelled",
      message: "Your order has been cancelled. Contact us if you have questions.",
      color: "#F44336",
    },
  };

  const status = statusMessages[newStatus] || statusMessages.confirmed;

  const html = baseEmailShell(`
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; width: 64px; height: 64px; border-radius: 50%; background-color: ${status.color}15; margin-bottom: 16px; line-height: 64px;">
        <span style="font-size: 28px; color: ${status.color};">&#10003;</span>
      </div>
      <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #F5F5F5;">
        ${status.title}
      </h2>
      <p style="margin: 0; font-size: 14px; color: ${grayColor};">
        ${status.message}
      </p>
    </div>

    <div style="background-color: rgba(255,255,255,0.03); border: 1px solid ${borderColor}; padding: 20px; margin-bottom: 24px;">
      <table style="width: 100%;">
        <tr>
          <td style="font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Order Number</td>
          <td style="font-size: 16px; font-weight: 700; color: ${accentColor}; text-align: right; letter-spacing: 1px;">${order.orderNumber}</td>
        </tr>
        <tr>
          <td style="padding-top: 12px; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Status</td>
          <td style="padding-top: 12px; text-align: right;">
            <span style="display: inline-block; padding: 4px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${status.color}; background-color: ${status.color}15; border: 1px solid ${status.color}30;">
              ${newStatus}
            </span>
          </td>
        </tr>
      </table>
    </div>

    <div style="text-align: center;">
      <a href="https://ascend.com/track-order" style="display: inline-block; padding: 14px 32px; background-color: ${accentColor}; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
        Track Your Order
      </a>
    </div>
  `);

  return {
    subject: `${status.title} — ${order.orderNumber}`,
    html,
  };
}

export function lowStockAlertEmail(products: Product[]): { subject: string; html: string; recipient: string } {
  const rowsHtml = products
    .map(
      (p) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid ${borderColor}; font-size: 13px; color: #F5F5F5;">
            ${p.name}
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid ${borderColor}; font-size: 13px; color: ${grayColor}; text-align: center;">
            ${p.category}
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid ${borderColor}; font-size: 13px; text-align: center;">
            <span style="color: ${p.stock === 0 ? "#F44336" : "#FF9800"}; font-weight: 600;">
              ${p.stock}
            </span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid ${borderColor}; font-size: 13px; color: ${accentColor}; text-align: right;">
            ${formatPrice(p.price)}
          </td>
        </tr>`
    )
    .join("");

  const html = baseEmailShell(`
    <div style="text-align: center; margin-bottom: 28px;">
      <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #F44336;">
        Low Stock Alert
      </h2>
      <p style="margin: 0; font-size: 13px; color: ${grayColor};">
        ${products.length} product${products.length !== 1 ? "s" : ""} running low on inventory.
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 8px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; border-bottom: 1px solid ${borderColor};">Product</th>
          <th style="text-align: center; padding: 8px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; border-bottom: 1px solid ${borderColor};">Category</th>
          <th style="text-align: center; padding: 8px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; border-bottom: 1px solid ${borderColor};">Stock</th>
          <th style="text-align: right; padding: 8px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; border-bottom: 1px solid ${borderColor};">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div style="text-align: center;">
      <a href="https://ascend.com/admin" style="display: inline-block; padding: 14px 32px; background-color: ${accentColor}; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
        Manage Inventory
      </a>
    </div>
  `);

  return {
    subject: `Low Stock Alert — ${products.length} product${products.length !== 1 ? "s" : ""} need restocking`,
    html,
    recipient: process.env.ADMIN_EMAIL || "admin@ascend.com",
  };
}

export function contactFormEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { subject: string; html: string; recipient: string } {
  const html = baseEmailShell(`
    <div style="margin-bottom: 24px;">
      <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #F5F5F5;">
        New Contact Message
      </h2>
      <p style="margin: 0; font-size: 13px; color: ${grayColor};">
        Someone reached out through the contact form.
      </p>
    </div>

    <div style="background-color: rgba(255,255,255,0.03); border: 1px solid ${borderColor}; padding: 20px; margin-bottom: 24px;">
      <table style="width: 100%;">
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Name</td>
          <td style="padding: 6px 0; font-size: 14px; color: #F5F5F5; text-align: right;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Email</td>
          <td style="padding: 6px 0; font-size: 14px; color: #F5F5F5; text-align: right;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: ${grayColor}; text-transform: uppercase; letter-spacing: 1px;">Subject</td>
          <td style="padding: 6px 0; font-size: 14px; color: #F5F5F5; text-align: right;">${data.subject}</td>
        </tr>
      </table>
    </div>

    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${grayColor}; font-weight: 600;">Message</p>
      <div style="background-color: rgba(255,255,255,0.03); border: 1px solid ${borderColor}; padding: 16px;">
        <p style="margin: 0; font-size: 14px; color: #F5F5F5; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>

    <div style="text-align: center;">
      <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 32px; background-color: ${accentColor}; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
        Reply to ${data.name}
      </a>
    </div>
  `);

  return {
    subject: `[ASCEND] ${data.subject}`,
    html,
    recipient: process.env.ADMIN_EMAIL || "admin@ascend.com",
  };
}
