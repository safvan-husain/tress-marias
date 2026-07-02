import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { SessionPayload, UserRole } from "@/app/lib/auth/definitions";
import { STAFF_ROLES } from "@/app/lib/auth/definitions";
import { getSession } from "@/app/lib/auth/session";
import { getUserByUsername } from "@/app/lib/db/users";
import type { PublicUser } from "@/app/lib/auth/definitions";

export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  return session;
});

export const verifyStaffSession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session?.userId || !STAFF_ROLES.includes(session.role)) {
    redirect("/admin/login");
  }
  return session;
});

export async function verifyRole(
  allowed: UserRole | UserRole[],
): Promise<SessionPayload> {
  const session = await verifyStaffSession();
  const roles = Array.isArray(allowed) ? allowed : [allowed];
  if (!roles.includes(session.role)) {
    redirect("/admin");
  }
  return session;
}

export const getCurrentUser = cache(async (): Promise<PublicUser | null> => {
  const session = await getSession();
  if (!session?.username) return null;

  const user = await getUserByUsername(session.username);
  if (!user) return null;

  return {
    username: user.username,
    userId: user.userId,
    role: user.role,
    createdAt: user.createdAt,
  };
});

export const getOptionalSession = cache(
  async (): Promise<SessionPayload | null> => {
    return getSession();
  },
);
