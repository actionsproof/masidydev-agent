import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://api.titan.email/mcp",
  description: "Search, read, and send business email, schedule meetings, and manage tasks.",
  auth: connect("api.titan.email/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
