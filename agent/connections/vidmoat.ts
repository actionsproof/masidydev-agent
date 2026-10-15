import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://api.vidmoat.com/api/mcp",
  description: "Edit video projects, generate media, and render finished MP4s.",
  auth: connect("api.vidmoat.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
