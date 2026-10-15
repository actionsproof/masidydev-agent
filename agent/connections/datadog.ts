import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.datadoghq.com/api/mcp",
  description: "Datadog: query metrics, monitors, logs, and incidents.",
  auth: connect("datadog/masidydev-datadog"),
});
