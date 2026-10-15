import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.indeed.com/claude/mcp",
  description: "Search jobs and explore hiring opportunities.",
  auth: connect("mcp.indeed.com/masidydev-indeed"),
});
