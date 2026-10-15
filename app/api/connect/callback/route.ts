import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getService } from "@/lib/services-catalog";

/**
 * GET /api/connect/callback
 *
 * Handles the OAuth callback from Vercel Connect after a user authorizes
 * a service connection. Vercel Connect sends back the installationId which
 * we store mapped to the authenticated user.
 *
 * Query params from Vercel Connect:
 *   - service: the service id we passed in the initial connect URL
 *   - installation_id: the Vercel Connect installationId for this user+service
 *   - error: set if the user denied or something went wrong
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const serviceId = searchParams.get("service");
  const installationId = searchParams.get("installation_id");
  const error = searchParams.get("error");

  // Handle OAuth denial or error from provider
  if (error || !serviceId) {
    const errorParam = serviceId ? `error=${encodeURIComponent(serviceId)}` : "error=unknown";
    return NextResponse.redirect(new URL(`/settings?${errorParam}`, req.url));
  }

  // Validate service
  const service = getService(serviceId);
  if (!service) {
    return NextResponse.redirect(new URL("/settings?error=unknown-service", req.url));
  }

  // Get authenticated user
  let userId = "dev-user";
  if (process.env.NODE_ENV !== "development") {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    userId = session.user.id;
  }

  // The installationId from Vercel Connect scopes this connection to this user.
  // In a full implementation, store this in Supabase for later retrieval.
  // For now: the eve agent connections use connect() which handles token storage
  // natively inside Vercel Connect — the installationId is managed there.
  // We log it for debugging and surface success to the user.
  if (installationId) {
    console.log(
      `[connect] User ${userId} connected ${serviceId} with installationId ${installationId}`,
    );
    // TODO: store in Supabase for connection status UI:
    // await upsertConnection(userId, serviceId, installationId);
  }

  return NextResponse.redirect(
    new URL(`/settings?connected=${encodeURIComponent(service.name)}`, req.url),
  );
}
