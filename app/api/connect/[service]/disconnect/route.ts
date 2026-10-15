import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getService } from "@/lib/services-catalog";

/**
 * POST /api/connect/[service]/disconnect
 *
 * Disconnects a service for the authenticated user.
 * Removes the installation from Vercel Connect storage.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ service: string }> },
) {
  const { service: serviceId } = await params;

  // Validate service
  const service = getService(serviceId);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  // Get authenticated user
  let userId = "dev-user";
  if (process.env.NODE_ENV !== "development") {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    userId = session.user.id;
  }

  console.log(`[connect] User ${userId} disconnected ${serviceId}`);
  // TODO: remove from Supabase:
  // await removeConnection(userId, serviceId);

  return NextResponse.json({ ok: true });
}
