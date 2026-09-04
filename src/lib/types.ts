export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  featured: boolean;
  new: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  conversionRate: number;
  topProducts: { name: string; sold: number }[];
  dailySales: { date: string; amount: number }[];
}

export type NotificationType =
  | "order_confirmation"
  | "admin_order_alert"
  | "order_status_update"
  | "low_stock_alert"
  | "contact_form";

export interface Notification {
  id: string;
  type: NotificationType;
  subject: string;
  recipient: string;
  status: "sent" | "failed" | "pending";
  createdAt: string;
  orderId?: string;
}
