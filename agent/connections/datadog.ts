import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.datadoghq.com/api/mcp",
  description: "Datadog: query metrics, monitors, logs, and incidents.",
  auth: connect("mcp.datadoghq.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"),
});
