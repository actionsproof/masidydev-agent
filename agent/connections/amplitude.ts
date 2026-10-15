import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.amplitude.com/mcp",
  description: "Explore product analytics and user behavior.",
  auth: connect("mcp.amplitude.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
