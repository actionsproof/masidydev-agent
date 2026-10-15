import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://platform.salespeak.ai/gtm-context/mcp",
  description: "Answer questions about your company from its Salespeak knowledge base.",
  auth: connect("platform.salespeak.ai/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
