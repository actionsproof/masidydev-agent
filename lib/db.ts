/**
 * Database helper functions for masidydev multi-tenant data.
 * All functions are server-side only (use service role key).
 */
import { createServerClient } from "./supabase-server";

// ─── Session types ────────────────────────────────────────────────────────────

export interface SessionRecord {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Session helpers ──────────────────────────────────────────────────────────

/**
 * Get all sessions for a user, ordered by most recently updated.
 */
export async function getUserSessions(userId: string): Promise<SessionRecord[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[db] getUserSessions error:", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Upsert a session record (create or update title/timestamp).
 */
export async function upsertSession(
  userId: string,
  sessionId: string,
  title?: string,
): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.from("sessions").upsert(
    {
      id: sessionId,
      user_id: userId,
      title: title ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("[db] upsertSession error:", error.message);
  }
}

/**
 * Delete a session for a user (ownership check included).
 */
export async function deleteSession(userId: string, sessionId: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("sessions")
    .delete()
    .eq("id", sessionId)
    .eq("user_id", userId); // ownership check

  if (error) {
    console.error("[db] deleteSession error:", error.message);
  }
}
