import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.webflow.com/mcp",
  description: "Manage CMS content, pages, assets, and sites.",
  auth: connect("mcp.webflow.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
