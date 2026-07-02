import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SessionPayload, UserRole } from "@/app/lib/auth/definitions";

const SESSION_COOKIE = "session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function decrypt(
  session: string | undefined,
): Promise<SessionPayload | null> {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, getSecretKey(), {
      algorithms: ["HS256"],
    });
    const data = payload as SessionPayload;
    if (!data.userId || !data.username || !data.role) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createSession(input: {
  userId: string;
  username: string;
  role: UserRole;
}): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS).toISOString();
  const session = await encrypt({
    userId: input.userId,
    username: input.username,
    role: input.role,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  return decrypt(value);
}
