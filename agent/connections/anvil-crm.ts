import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://app.anvilcrm.com/api/mcp",
  description: "Search and update accounts, contacts, deals, and pipelines.",
  auth: connect("app.anvilcrm.com/masidydev-anvil"),
});
