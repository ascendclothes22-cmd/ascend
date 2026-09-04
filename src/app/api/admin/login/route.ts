import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  buildSessionToken,
  getAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // Invalid body — treated as an empty password below.
  }

  const expected = getAdminPassword();
  // Fail closed: with no configured password (production without
  // ADMIN_PASSWORD) every attempt gets the same generic rejection.
  if (!expected || !password || password !== expected) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  const token = await buildSessionToken(password);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
