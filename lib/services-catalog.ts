/**
 * Catalog of all 30 services available in masidydev.
 * Each service maps to a Vercel Connect connector UID and an MCP endpoint.
 */

export type ServiceCategory =
  | "Infra & Deploy"
  | "Dev & Code"
  | "Project Management"
  | "Marketing & Content"
  | "CRM & Sites"
  | "Payments"
  | "Automation"
  | "Media & Video"
  | "Agent Identity"
  | "Research & Analytics"
  | "Jobs & Hiring";

export interface ServiceDefinition {
  /** Stable machine-readable key, matches the connection filename */
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  /** The Vercel Connect connector UID used in connect("uid") */
  connectorUid: string;
  /** MCP server URL */
  mcpUrl: string;
  /** Emoji icon shown in the UI */
  icon: string;
}

export const SERVICES: ServiceDefinition[] = [
  // ─── Infra & Deploy ───────────────────────────────────────────────────────
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy apps, manage projects, env vars, and domains.",
    category: "Infra & Deploy",
    connectorUid: "mcp.vercel.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.vercel.com",
    icon: "▲",
  },
  {
    id: "netlify",
    name: "Netlify",
    description: "Build and deploy websites.",
    category: "Infra & Deploy",
    connectorUid: "netlify-mcp.netlify.app/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://netlify-mcp.netlify.app/mcp",
    icon: "🌿",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    description: "Workers, KV storage, R2 buckets, and AI bindings.",
    category: "Infra & Deploy",
    connectorUid: "mcp.cloudflare.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.cloudflare.com/mcp",
    icon: "🟠",
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Databases, authentication, and storage buckets.",
    category: "Infra & Deploy",
    connectorUid: "mcp.supabase.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.supabase.com/mcp",
    icon: "🟢",
  },
  {
    id: "upstash-redis",
    name: "Upstash Redis",
    description: "Redis, QStash message queues, Vector, and Search.",
    category: "Infra & Deploy",
    connectorUid: "mcp.upstash.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.upstash.com/mcp",
    icon: "🔴",
  },

  // ─── Dev & Code ───────────────────────────────────────────────────────────
  {
    id: "postman",
    name: "Postman",
    description: "Browse API collections and give agents API context.",
    category: "Dev & Code",
    connectorUid: "mcp.postman.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.postman.com/minimal",
    icon: "📮",
  },
  {
    id: "lovable",
    name: "Lovable",
    description: "Build and update web applications by chat.",
    category: "Dev & Code",
    connectorUid: "api.lovable.dev/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://api.lovable.dev/mcp",
    icon: "💜",
  },
  {
    id: "hugging-face",
    name: "Hugging Face",
    description: "Explore models, datasets, and Gradio apps.",
    category: "Dev & Code",
    connectorUid: "huggingface.co/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://huggingface.co/mcp?login&gradio=none",
    icon: "🤗",
  },
  {
    id: "sanity",
    name: "Sanity",
    description: "Query and edit structured content in your datasets.",
    category: "Dev & Code",
    connectorUid: "mcp.sanity.io/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.sanity.io",
    icon: "🔷",
  },

  // ─── Project Management ───────────────────────────────────────────────────
  {
    id: "linear",
    name: "Linear",
    description: "Issues, projects, cycles, and team comments.",
    category: "Project Management",
    connectorUid: "mcp.linear.app/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.linear.app/mcp",
    icon: "📐",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Search and edit pages, databases, and docs.",
    category: "Project Management",
    connectorUid: "mcp.notion.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.notion.com/mcp",
    icon: "📝",
  },
  {
    id: "lucid",
    name: "Lucid",
    description: "Create and collaborate on diagrams and flowcharts.",
    category: "Project Management",
    connectorUid: "mcp.lucid.app/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.lucid.app/mcp",
    icon: "🔶",
  },
  {
    id: "jotform",
    name: "Jotform",
    description: "Work with forms and read submissions.",
    category: "Project Management",
    connectorUid: "mcp.jotform.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.jotform.com/mcp-app",
    icon: "📋",
  },

  // ─── Marketing & Content ──────────────────────────────────────────────────
  {
    id: "adaptlypost",
    name: "AdaptlyPost",
    description: "Schedule and publish social media posts, read analytics.",
    category: "Marketing & Content",
    connectorUid: "mcp.adaptlypost.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.adaptlypost.com/mcp",
    icon: "📲",
  },
  {
    id: "bulkpublish",
    name: "BulkPublish",
    description: "Schedule posts across multiple social networks at once.",
    category: "Marketing & Content",
    connectorUid: "mcp.bulkpublish.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.bulkpublish.com/mcp",
    icon: "📡",
  },
  {
    id: "intuit-mailchimp",
    name: "Mailchimp",
    description: "Manage email campaigns and audience segments.",
    category: "Marketing & Content",
    connectorUid: "ai-inc.mailchimp.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://ai-inc.mailchimp.com/claude/mcp/v2",
    icon: "🐵",
  },
  {
    id: "resend",
    name: "Resend",
    description: "Send transactional emails from your apps.",
    category: "Marketing & Content",
    connectorUid: "mcp.resend.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.resend.com",
    icon: "📧",
  },
  {
    id: "titan-email",
    name: "Titan Email",
    description: "Search, read, send business email, schedule meetings, manage tasks.",
    category: "Marketing & Content",
    connectorUid: "api.titan.email/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://api.titan.email/mcp",
    icon: "📬",
  },
  {
    id: "html-css-to-image",
    name: "HTML/CSS to Image",
    description: "Generate images, screenshots, and PDFs from HTML or URLs.",
    category: "Marketing & Content",
    connectorUid: "mcp.hcti.io/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.hcti.io",
    icon: "🖼️",
  },
  {
    id: "adobe",
    name: "Adobe Express",
    description: "Create and edit designs with Adobe Express.",
    category: "Marketing & Content",
    connectorUid: "express-mcp-service.adobe.io/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://express-mcp-service.adobe.io/mcp",
    icon: "🎨",
  },

  // ─── CRM & Sites ──────────────────────────────────────────────────────────
  {
    id: "anvil-crm",
    name: "Anvil CRM",
    description: "Search and update accounts, contacts, deals, and pipelines.",
    category: "CRM & Sites",
    connectorUid: "app.anvilcrm.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://app.anvilcrm.com/api/mcp",
    icon: "⚒️",
  },
  {
    id: "webflow",
    name: "Webflow",
    description: "Manage CMS content, pages, assets, and sites.",
    category: "CRM & Sites",
    connectorUid: "mcp.webflow.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.webflow.com/mcp",
    icon: "🌐",
  },
  {
    id: "wix",
    name: "Wix",
    description: "Build and manage Wix sites and apps.",
    category: "CRM & Sites",
    connectorUid: "mcp.wix.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.wix.com/mcp",
    icon: "🕸️",
  },

  // ─── Payments ─────────────────────────────────────────────────────────────
  {
    id: "stripe",
    name: "Stripe",
    description: "Manage payments, products, subscriptions, and customers.",
    category: "Payments",
    connectorUid: "mcp.stripe.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.stripe.com",
    icon: "💳",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Manage invoices, subscriptions, and payment links.",
    category: "Payments",
    connectorUid: "mcp.paypal.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.paypal.com/mcp",
    icon: "🅿️",
  },

  // ─── Automation ───────────────────────────────────────────────────────────
  {
    id: "make",
    name: "Make",
    description: "Run scenarios and manage automations.",
    category: "Automation",
    connectorUid: "mcp.make.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.make.com",
    icon: "⚙️",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows across thousands of apps.",
    category: "Automation",
    connectorUid: "mcp.zapier.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.zapier.com/api/v1/connect",
    icon: "⚡",
  },

  // ─── Media & Video ────────────────────────────────────────────────────────
  {
    id: "faceless",
    name: "Faceless",
    description: "Create, render, and publish AI-generated short videos.",
    category: "Media & Video",
    connectorUid: "faceless.so/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://faceless.so/api/v1/mcp",
    icon: "🎬",
  },
  {
    id: "vidmoat",
    name: "Vidmoat",
    description: "Edit video projects, generate media, and render MP4s.",
    category: "Media & Video",
    connectorUid: "api.vidmoat.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://api.vidmoat.com/api/mcp",
    icon: "🎥",
  },

  // ─── Agent Identity ───────────────────────────────────────────────────────
  {
    id: "agentmail",
    name: "AgentMail",
    description: "Email inboxes for your AI agent.",
    category: "Agent Identity",
    connectorUid: "mcp.agentmail.to/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.agentmail.to/mcp",
    icon: "📨",
  },
  {
    id: "agentphone",
    name: "AgentPhone",
    description: "Phone numbers for AI agents: SMS and voice calls.",
    category: "Agent Identity",
    connectorUid: "mcp.agentphone.ai/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.agentphone.ai/mcp",
    icon: "📞",
  },
  {
    id: "agentcard",
    name: "AgentCard",
    description: "Issue virtual cards so your agent can make purchases.",
    category: "Agent Identity",
    connectorUid: "mcp.agentcard.sh/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.agentcard.sh/mcp",
    icon: "💰",
  },
  {
    id: "agent-loadout",
    name: "Agent Loadout",
    description: "Full agent identity kit: email, credentials vault, cards, and machines.",
    category: "Agent Identity",
    connectorUid: "agent-loadout.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://agent-loadout.com",
    icon: "🎒",
  },
  {
    id: "salespeak",
    name: "Salespeak",
    description: "Answer questions from your company's knowledge base.",
    category: "Agent Identity",
    connectorUid: "platform.salespeak.ai/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://platform.salespeak.ai/gtm-context/mcp",
    icon: "🗣️",
  },

  // ─── Research & Analytics ─────────────────────────────────────────────────
  {
    id: "firecrawl",
    name: "Firecrawl",
    description: "Scrape websites, crawl sitemaps, extract structured data.",
    category: "Research & Analytics",
    connectorUid: "www.firecrawl.dev/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://www.firecrawl.dev",
    icon: "🔥",
  },
  {
    id: "search1api",
    name: "Search1API",
    description: "Search the web and news, crawl pages, discover sitemaps.",
    category: "Research & Analytics",
    connectorUid: "mcp.search1api.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.search1api.com/mcp",
    icon: "🔍",
  },
  {
    id: "amplitude",
    name: "Amplitude",
    description: "Explore product analytics and user behavior.",
    category: "Research & Analytics",
    connectorUid: "mcp.amplitude.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.amplitude.com/mcp",
    icon: "📊",
  },
  {
    id: "datadog",
    name: "Datadog",
    description: "Query metrics, monitors, logs, and incidents.",
    category: "Research & Analytics",
    connectorUid: "mcp.datadoghq.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.datadoghq.com/api/mcp",
    icon: "🐕",
  },
  {
    id: "local-falcon",
    name: "Local Falcon",
    description: "Track local search rankings and AI visibility.",
    category: "Research & Analytics",
    connectorUid: "mcp.localfalcon.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.localfalcon.com",
    icon: "🦅",
  },

  // ─── Jobs & Hiring ────────────────────────────────────────────────────────
  {
    id: "foundrole",
    name: "FoundRole",
    description: "Search job openings, analyze roles, and track applications.",
    category: "Jobs & Hiring",
    connectorUid: "www.foundrole.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://www.foundrole.com/mcp",
    icon: "🔭",
  },
  {
    id: "indeed",
    name: "Indeed",
    description: "Search jobs and explore hiring opportunities.",
    category: "Jobs & Hiring",
    connectorUid: "mcp.indeed.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl",
    mcpUrl: "https://mcp.indeed.com/claude/mcp",
    icon: "💼",
  },
];

/** All unique categories in display order */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Infra & Deploy",
  "Dev & Code",
  "Project Management",
  "Marketing & Content",
  "CRM & Sites",
  "Payments",
  "Automation",
  "Media & Video",
  "Agent Identity",
  "Research & Analytics",
  "Jobs & Hiring",
];

/** Look up a service by id */
export function getService(id: string): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.id === id);
}

/** Group services by category */
export function getServicesByCategory(): Record<ServiceCategory, ServiceDefinition[]> {
  return SERVICE_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = SERVICES.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<ServiceCategory, ServiceDefinition[]>,
  );
}
