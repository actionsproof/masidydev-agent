import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://faceless.so/api/v1/mcp",
  description: "Create, render, and publish AI-generated short videos.",
  auth: connect("faceless.so/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
