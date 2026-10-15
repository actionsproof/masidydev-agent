import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getService } from "@/lib/services-catalog";

/**
 * GET /api/connect/[service]
 *
 * Initiates the Vercel Connect OAuth install flow for the given service.
 * The user is redirected to the provider's OAuth authorization page.
 *
 * When the user completes OAuth, Vercel Connect calls back to
 * /api/connect/callback with the installationId.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ service: string }> },
) {
  const { service: serviceId } = await params;

  // Validate the service exists in our catalog
  const service = getService(serviceId);
  if (!service) {
    return NextResponse.redirect(new URL(`/settings?error=unknown-service`, req.url));
  }

  // In dev, skip auth (consistent with the rest of the app)
  if (process.env.NODE_ENV !== "development") {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Build the Vercel Connect authorization URL.
  // The connector UID tells Vercel Connect which provider to use.
  // The callbackUrl is where Vercel Connect will redirect after the user authorizes.
  const callbackUrl = new URL("/api/connect/callback", req.url);
  callbackUrl.searchParams.set("service", serviceId);

  // Vercel Connect authorization endpoint
  // Format: https://vercel.com/integrations/connect/authorize?connector=<uid>&callback=<url>
  const authUrl = new URL("https://vercel.com/integrations/connect/authorize");
  authUrl.searchParams.set("connector", service.connectorUid);
  authUrl.searchParams.set("callback", callbackUrl.toString());

  return NextResponse.redirect(authUrl.toString());
}
