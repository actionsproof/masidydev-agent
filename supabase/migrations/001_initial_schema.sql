-- masidydev multi-tenant schema
-- Run this migration against your Supabase project

-- Sessions table: stores chat session metadata per user
CREATE TABLE IF NOT EXISTS sessions (
  id text PRIMARY KEY,
  user_id text NOT NULL,
  title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_updated_at_idx ON sessions(updated_at DESC);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- RLS: service role bypasses RLS, anon/authenticated users are locked out
-- We use the service role key server-side only, so RLS here is a safety net
CREATE POLICY "No direct client access to sessions"
  ON sessions FOR ALL TO anon, authenticated
  USING (false);
