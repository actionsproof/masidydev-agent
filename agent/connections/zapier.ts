import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.zapier.com/api/v1/connect",
  description: "Automate workflows across thousands of apps.",
  auth: connect("mcp.zapier.com/masidydev-zapier"),
});
