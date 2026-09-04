// Shared admin authentication helpers.
// Pure Web Crypto (no Node-only imports) so this module runs in both the
// Edge middleware (src/middleware.ts) and Node API routes.

export const ADMIN_COOKIE = "ascend_admin_session";

const TOKEN_SALT = "ascend::admin::session::v1";
// Local-development-only fallback so `npm run dev` works out of the box.
// It is NEVER accepted in production when ADMIN_PASSWORD is unset: there
// the panel fails closed and every login attempt is rejected.
const DEV_FALLBACK_PASSWORD = "ascend2024";

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

/**
 * The password currently accepted by the panel, or `undefined` when every
 * login must be rejected (production without an ADMIN_PASSWORD env var).
 */
export function getAdminPassword(): string | undefined {
  const configured = process.env.ADMIN_PASSWORD?.trim();
  if (configured) return configured;
  return process.env.NODE_ENV === "production"
    ? undefined
    : DEV_FALLBACK_PASSWORD;
}

function toHex(bytes: Uint8Array): string {
  let hex = "";
  for (const byte of bytes) hex += byte.toString(16).padStart(2, "0");
  return hex;
}

function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  return crypto.subtle.digest("SHA-256", data).then((digest) =>
    toHex(new Uint8Array(digest))
  );
}

export function buildSessionToken(password: string): Promise<string> {
  return sha256Hex(`${TOKEN_SALT}::${password}`);
}

export async function isValidSession(
  cookieValue: string | undefined | null
): Promise<boolean> {
  if (!cookieValue) return false;
  const password = getAdminPassword();
  if (!password) return false; // Fail closed when nothing is configured.
  const expected = await buildSessionToken(password);
  if (expected.length !== cookieValue.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ cookieValue.charCodeAt(i);
  }
  return diff === 0;
}
