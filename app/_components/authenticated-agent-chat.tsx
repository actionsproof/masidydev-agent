import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AgentChat } from "./agent-chat";
import { SessionSidebar } from "./session-sidebar";
import { AccountControl, SignIn } from "./web-chat-auth";

export async function AuthenticatedAgentChat({
  sessionId,
  sessionless,
}: {
  readonly sessionId?: string;
  readonly sessionless?: boolean;
}) {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="flex h-dvh overflow-hidden bg-background">
        <SessionSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AgentChat sessionId={sessionId} sessionless={sessionless} />
        </div>
      </div>
    );
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <SignIn />;

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <SessionSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AgentChat sessionId={sessionId} sessionless={sessionless} />
        <AccountControl
          email={session.user.email}
          image={session.user.image}
          name={session.user.name}
        />
      </div>
    </div>
  );
}
