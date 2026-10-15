import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.sanity.io",
  description: "Query and edit content in your datasets.",
  auth: connect("mcp.sanity.io/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
