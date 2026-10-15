import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://netlify-mcp.netlify.app/mcp",
  description: "Build and deploy websites.",
  auth: connect("netlify-mcp.netlify.app/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
