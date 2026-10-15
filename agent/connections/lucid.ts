import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.lucid.app/mcp",
  description: "Create and collaborate on diagrams.",
  auth: connect("mcp.lucid.app/masidydev-lucid"),
});
