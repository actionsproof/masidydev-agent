import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://www.firecrawl.dev",
  description: "Search, scrape, and crawl websites into clean markdown or structured data.",
  auth: connect("www.firecrawl.dev/masidydev-firecrawl"),
});
