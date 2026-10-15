import { createClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (process.env.NODE_ENV === "development") return `dev-missing-${name}`;
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Server-side Supabase client using the service role key.
 * Only use this in server components, API routes, and server actions.
 * Never expose the service role key to the client.
 */
export function createServerClient() {
  return createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
