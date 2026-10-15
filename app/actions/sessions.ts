"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { deleteSession, getUserSessions, upsertSession } from "@/lib/db";

async function getCurrentUserId(): Promise<string | null> {
  if (process.env.NODE_ENV === "development") return "dev-user";
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user.id ?? null;
}

export async function getSessions() {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  return getUserSessions(userId);
}

export async function saveSession(sessionId: string, title?: string) {
  const userId = await getCurrentUserId();
  if (!userId) return;
  await upsertSession(userId, sessionId, title);
}

export async function removeSession(sessionId: string) {
  const userId = await getCurrentUserId();
  if (!userId) return;
  await deleteSession(userId, sessionId);
}
