"use client";

import { PlugIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WORKFLOW_CHIPS = [
  {
    label: "Set up a project",
    prompt: "Set up a new project: create a Linear workspace, a Supabase database, and deploy to Vercel.",
  },
  {
    label: "Run a marketing campaign",
    prompt: "Help me run a marketing campaign: research competitors with Firecrawl, create visuals with Adobe Express, set up a Mailchimp email campaign, and schedule social posts.",
  },
  {
    label: "Handle my leads",
    prompt: "Handle my leads: read the latest Jotform submissions, add new contacts to Anvil CRM, and send welcome emails via Resend.",
  },
  {
    label: "Create and publish a video",
    prompt: "Research a trending topic with Search1API, then create and publish an AI-generated short video with Faceless, and schedule it across social platforms with BulkPublish.",
  },
  {
    label: "Check my metrics",
    prompt: "Give me a metrics summary: pull product analytics from Amplitude and infrastructure metrics from Datadog, then send me a summary via Resend.",
  },
] as const;

interface EmptyStateProps {
  readonly connectedCount: number;
  readonly totalCount: number;
  readonly onChipClick: (prompt: string) => void;
}

export function EmptyState({ connectedCount, totalCount, onChipClick }: EmptyStateProps) {
  const hasConnections = connectedCount > 0;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      {/* Wordmark */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-semibold text-2xl text-foreground tracking-tight">masidydev</h1>
        <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
          Your universal AI operator. Connect your tools and let the agent work across all of them.
        </p>
      </div>

      {/* Connection status */}
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/settings"
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors hover:bg-muted ${
            hasConnections
              ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
              : "border-border text-muted-foreground"
          }`}
        >
          <PlugIcon aria-hidden="true" className="size-3.5" />
          {hasConnections
            ? `${connectedCount} / ${totalCount} services connected`
            : `Connect your first service →`}
        </Link>

        {!hasConnections && (
          <p className="text-muted-foreground text-xs">
            Connect at least one service to start using the agent.
          </p>
        )}
      </div>

      {/* Workflow chips */}
      {hasConnections && (
        <div className="flex w-full max-w-2xl flex-col gap-3">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
            Try a workflow
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {WORKFLOW_CHIPS.map((chip) => (
              <Button
                key={chip.label}
                className="h-auto rounded-full px-4 py-2 text-xs"
                onClick={() => onChipClick(chip.prompt)}
                variant="outline"
              >
                {chip.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
