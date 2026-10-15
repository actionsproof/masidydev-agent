import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.search1api.com/mcp",
  description: "Search the web and news, crawl pages, and discover sitemaps.",
  auth: connect("mcp.search1api.com/masidydev-search1"),
});
