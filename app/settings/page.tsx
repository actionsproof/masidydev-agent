import { ArrowLeftIcon, PlugIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SERVICES } from "@/lib/services-catalog";
import { ConnectionsGrid } from "./_components/connections-grid";

export const metadata = {
  title: "Connect Accounts — masidydev",
  description: "Connect your third-party accounts to unlock all 30 capabilities.",
};

export default async function SettingsPage({
  searchParams,
}: {
  readonly searchParams: Promise<{ connected?: string; error?: string; disconnected?: string }>;
}) {
  // In dev, skip auth check
  let userId = "dev-user";
  if (process.env.NODE_ENV !== "development") {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/");
    userId = session.user.id;
  }

  const params = await searchParams;
  const totalServices = SERVICES.length;

  // For now, connectedServiceIds comes from URL state (will be DB-backed post-OAuth).
  // In a real deployment, query the DB: const rows = await getUserConnections(userId);
  // For the UI skeleton, we start with an empty set so users see what to connect.
  const connectedServiceIds: string[] = [];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            aria-label="Back to chat"
            className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            Back to chat
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <PlugIcon aria-hidden="true" className="size-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-semibold text-foreground">{connectedServiceIds.length}</span>
              <span className="text-muted-foreground"> / {totalServices} connected</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-foreground">Connect Accounts</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Connect your own accounts to unlock capabilities. Your data stays in your accounts —
            masidydev acts on your behalf.
          </p>
        </div>

        {/* Success / error toasts */}
        {params.connected && (
          <div
            className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-700 text-sm dark:text-emerald-400"
            role="alert"
          >
            ✓ <strong>{params.connected}</strong> connected successfully.
          </div>
        )}
        {params.disconnected && (
          <div
            className="mb-6 rounded-lg border border-border bg-muted px-4 py-3 text-muted-foreground text-sm"
            role="alert"
          >
            <strong>{params.disconnected}</strong> disconnected.
          </div>
        )}
        {params.error && (
          <div
            className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive text-sm"
            role="alert"
          >
            ✗ Failed to connect <strong>{params.error}</strong>. Please try again.
          </div>
        )}

        <ConnectionsGrid connectedServiceIds={connectedServiceIds} />
      </div>
    </main>
  );
}
