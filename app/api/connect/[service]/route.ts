import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getService } from "@/lib/services-catalog";

/**
 * GET /api/connect/[service]
 *
 * Initiates the Vercel Connect OAuth install flow for the given service.
 *
 * NOTE: Vercel Connect authorization requires a Vercel OIDC token which is
 * only available on Vercel deployments. This route works in production.
 * In local dev, it shows a helpful message.
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

  // In local dev, Vercel OIDC tokens are not available.
  // Show a clear explanation instead of failing silently.
  if (process.env.NODE_ENV === "development" && !process.env.VERCEL_OIDC_TOKEN) {
    const url = new URL("/settings", req.url);
    url.searchParams.set(
      "devnote",
      `Connecting ${service.name} requires a Vercel deployment. Deploy to masidydev.vercel.app to connect real accounts.`,
    );
    return NextResponse.redirect(url);
  }

  // In production: get authenticated user
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Build callback URL
  const callbackUrl = new URL("/api/connect/callback", req.url);
  callbackUrl.searchParams.set("service", serviceId);

  try {
    // Dynamically import to avoid breaking local dev builds
    const { startAuthorization } = await import("@vercel/connect");
    const result = await startAuthorization(service.connectorUid, {
      subject: { type: "user", id: session.user.id },
    }, {
      callbackUrl: callbackUrl.toString(),
    });

    // Redirect user to the authorization URL returned by Vercel Connect
    if ("url" in result && result.url) {
      return NextResponse.redirect(result.url as string);
    }

    return NextResponse.redirect(new URL(`/settings?error=${encodeURIComponent(service.id)}`, req.url));
  } catch (err) {
    console.error(`[connect] Failed to start authorization for ${serviceId}:`, err);
    return NextResponse.redirect(new URL(`/settings?error=${encodeURIComponent(service.id)}`, req.url));
  }
}
