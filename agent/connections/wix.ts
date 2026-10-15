import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.wix.com/mcp",
  description: "Build and manage sites and apps.",
  auth: connect("mcp.wix.com/masidydev-wix"),
});
