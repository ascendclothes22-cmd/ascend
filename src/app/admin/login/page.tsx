import type { Metadata } from "next";
import { isAdminPasswordConfigured } from "@/lib/admin-auth";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | ASCEND",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  const isProduction = process.env.NODE_ENV === "production";
  const configured = isAdminPasswordConfigured();

  return (
    <AdminLoginForm
      locked={isProduction && !configured}
      usingDevDefault={!configured}
    />
  );
}
