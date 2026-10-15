import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://platform.salespeak.ai/gtm-context/mcp",
  description: "Answer questions about your company from its Salespeak knowledge base.",
  auth: connect("platform.salespeak.ai/masidydev-salespeak"),
});
