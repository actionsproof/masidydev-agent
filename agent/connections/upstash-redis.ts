import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.upstash.com/mcp",
  description: "Manage and debug your Redis, QStash, Vector, and Search data.",
  auth: connect("mcp.upstash.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
