"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MessageSquareIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSessions, removeSession } from "../actions/sessions";

interface SessionItem {
  id: string;
  title: string | null;
  updated_at: string;
}

type DateGroup = "Today" | "Yesterday" | "This week" | "Older";

function getDateGroup(dateStr: string): DateGroup {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "This week";
  return "Older";
}

const DATE_GROUP_ORDER: DateGroup[] = ["Today", "Yesterday", "This week", "Older"];

export function SessionSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const currentSessionId = pathname.startsWith("/s/")
    ? decodeURIComponent(pathname.slice(3))
    : null;

  useEffect(() => {
    startTransition(async () => {
      const data = await getSessions();
      setSessions(data);
    });
  }, [pathname]); // refresh when navigation happens

  function handleDelete(e: React.MouseEvent, sessionId: string) {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      await removeSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        router.push("/");
      }
    });
  }

  // Group sessions by date
  const grouped: Record<DateGroup, SessionItem[]> = {
    Today: [],
    Yesterday: [],
    "This week": [],
    Older: [],
  };
  for (const session of sessions) {
    grouped[getDateGroup(session.updated_at)].push(session);
  }

  return (
    <aside
      aria-label="Chat history"
      className={cn(
        "relative flex h-dvh flex-col border-r bg-background transition-all duration-200",
        isOpen ? "w-56 min-w-56" : "w-10 min-w-10",
      )}
    >
      {/* Toggle button */}
      <button
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        className="absolute -right-3 top-4 z-20 flex size-6 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {isOpen ? (
          <ChevronLeftIcon aria-hidden="true" className="size-3" />
        ) : (
          <ChevronRightIcon aria-hidden="true" className="size-3" />
        )}
      </button>

      {isOpen && (
        <>
          {/* New chat button */}
          <div className="px-2 pt-4 pb-2">
            <Link href="/" className="block">
              <Button
                className="w-full justify-start gap-2 text-xs"
                size="sm"
                variant="outline"
              >
                <PlusIcon aria-hidden="true" className="size-3.5" />
                New chat
              </Button>
            </Link>
          </div>

          {/* Session list */}
          <nav className="flex-1 overflow-y-auto px-2 pb-4" aria-label="Past sessions">
            {sessions.length === 0 && !isPending && (
              <p className="px-2 py-4 text-center text-muted-foreground text-xs">
                No past sessions yet.
              </p>
            )}

            {DATE_GROUP_ORDER.map((group) => {
              const items = grouped[group];
              if (!items || items.length === 0) return null;
              return (
                <div key={group} className="mb-3">
                  <p className="mb-1 px-2 font-medium text-muted-foreground text-xs">{group}</p>
                  <ul className="space-y-0.5">
                    {items.map((session) => (
                      <li key={session.id}>
                        <Link
                          href={`/s/${encodeURIComponent(session.id)}`}
                          className={cn(
                            "group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted",
                            currentSessionId === session.id && "bg-muted font-medium",
                          )}
                        >
                          <MessageSquareIcon
                            aria-hidden="true"
                            className="size-3 shrink-0 text-muted-foreground"
                          />
                          <span className="flex-1 truncate">
                            {session.title ?? "Untitled session"}
                          </span>
                          <button
                            aria-label={`Delete session: ${session.title ?? "Untitled"}`}
                            className="ml-auto hidden shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100 group-hover:flex"
                            onClick={(e) => handleDelete(e, session.id)}
                            type="button"
                          >
                            <Trash2Icon aria-hidden="true" className="size-3" />
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </>
      )}
    </aside>
  );
}
