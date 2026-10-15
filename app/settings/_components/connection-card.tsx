"use client";

import { CheckCircleIcon, LinkIcon, Loader2Icon, UnlinkIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ServiceDefinition } from "@/lib/services-catalog";

interface ConnectionCardProps {
  readonly service: ServiceDefinition;
  readonly connected: boolean;
}

export function ConnectionCard({ service, connected }: ConnectionCardProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticConnected, setOptimisticConnected] = useState(connected);

  function handleConnect() {
    // Redirect to the OAuth initiation route
    window.location.href = `/api/connect/${encodeURIComponent(service.id)}`;
  }

  function handleDisconnect() {
    startTransition(async () => {
      setOptimisticConnected(false);
      try {
        const res = await fetch(`/api/connect/${encodeURIComponent(service.id)}/disconnect`, {
          method: "POST",
        });
        if (!res.ok) {
          setOptimisticConnected(true); // revert on error
        }
      } catch {
        setOptimisticConnected(true);
      }
    });
  }

  return (
    <div
      className={`relative flex flex-col gap-3 rounded-xl border p-4 transition-colors ${
        optimisticConnected
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-border bg-card hover:border-border/80"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-xl leading-none">
            {service.icon}
          </span>
          <span className="font-medium text-sm leading-tight">{service.name}</span>
        </div>
        {optimisticConnected && (
          <CheckCircleIcon
            aria-label="Connected"
            className="size-4 shrink-0 text-emerald-500"
          />
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xs leading-relaxed">{service.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <Badge className="text-xs" variant="secondary">
          {service.category}
        </Badge>

        {optimisticConnected ? (
          <Button
            className="h-7 gap-1.5 px-2 text-xs text-destructive hover:text-destructive"
            disabled={isPending}
            onClick={handleDisconnect}
            size="sm"
            variant="ghost"
          >
            {isPending ? (
              <Loader2Icon aria-hidden="true" className="size-3 animate-spin" />
            ) : (
              <UnlinkIcon aria-hidden="true" className="size-3" />
            )}
            Disconnect
          </Button>
        ) : (
          <Button
            className="h-7 gap-1.5 px-2 text-xs"
            onClick={handleConnect}
            size="sm"
            variant="outline"
            title="Connect on masidydev.vercel.app (requires Vercel deployment)"
          >
            <LinkIcon aria-hidden="true" className="size-3" />
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
