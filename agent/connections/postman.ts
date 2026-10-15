import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.postman.com/minimal",
  description: "Give coding agents context about your APIs.",
  auth: connect("mcp.postman.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
