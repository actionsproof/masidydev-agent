import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.jotform.com/mcp-app",
  description: "Work with forms and submissions.",
  auth: connect("mcp.jotform.com/masidydev-jotform"),
});
