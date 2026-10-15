import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.localfalcon.com",
  description: "Track local search rankings and AI visibility.",
  auth: connect("mcp.localfalcon.com/masidydev-falcon"),
});
