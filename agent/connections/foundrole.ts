import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://www.foundrole.com/mcp",
  description: "Search job openings, analyze roles, and track applications.",
  auth: connect("www.foundrole.com/masidydev-foundrole"),
});
