#!/usr/bin/env node
// patch-uids.mjs — patches connection files with the real connector UIDs
// already created by setup-connectors.mjs

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Map: connection file basename -> real connector UID (from vercel connect list)
const UID_MAP = {
  "vercel":           "vercel/masidydev-vercel",
  "netlify":          "netlify-mcp.netlify.app/masidydev-netlify",
  "cloudflare":       "mcp.cloudflare.com/masidydev-cloudflare",
  "supabase":         "mcp.supabase.com/masidydev-supabase",       // may need re-create (failed OAuth discovery)
  "upstash-redis":    "mcp.upstash.com/masidydev-upstash",         // may need re-create
  "postman":          "mcp.postman.com/masidydev-postman",
  "lovable":          "api.lovable.dev/masidydev-lovable",
  "hugging-face":     "huggingface.co/masidydev-hf",
  "sanity":           "mcp.sanity.io/masidydev-sanity",
  "linear":           "mcp.linear.app/masidydev-linear",
  "notion":           "mcp.notion.com/masidydev-notion",
  "lucid":            "mcp.lucid.app/masidydev-lucid",
  "jotform":          "mcp.jotform.com/masidydev-jotform",
  "adaptlypost":      "mcp.adaptlypost.com/masidydev-adaptly",
  "bulkpublish":      "mcp.bulkpublish.com/masidydev-bulk",
  "intuit-mailchimp": "ai-inc.mailchimp.com/masidydev-mailchimp",
  "resend":           "mcp.resend.com/masidydev-resend",
  "titan-email":      "api.titan.email/masidydev-titan",
  "html-css-to-image":"mcp.hcti.io/masidydev-hcti",
  "adobe":            "express-mcp-service.adobe.io/masidydev-adobe",
  "anvil-crm":        "app.anvilcrm.com/masidydev-anvil",
  "webflow":          "mcp.webflow.com/masidydev-webflow",
  "wix":              "mcp.wix.com/masidydev-wix",
  "stripe":           "mcp.stripe.com/masidydev-stripe",
  "paypal":           "mcp.paypal.com/masidydev-paypal",
  "make":             "mcp.make.com/masidydev-make",
  "zapier":           "mcp.zapier.com/masidydev-zapier",
  "faceless":         "faceless.so/masidydev-faceless",
  "vidmoat":          "api.vidmoat.com/masidydev-vidmoat",
  "agentmail":        "agentmail/masidydev-agentmail",
  "agentphone":       "mcp.agentphone.ai/masidydev-agentphone",
  "agentcard":        "agentcard/masidydev-agentcard",
  "agent-loadout":    "agent-loadout.com/masidydev-loadout",
  "salespeak":        "platform.salespeak.ai/masidydev-salespeak",
  "firecrawl":        "www.firecrawl.dev/masidydev-firecrawl",
  "search1api":       "mcp.search1api.com/masidydev-search1",
  "amplitude":        "mcp.amplitude.com/masidydev-amplitude",
  "datadog":          "datadog/masidydev-datadog",
  "local-falcon":     "mcp.localfalcon.com/masidydev-falcon",
  "foundrole":        "www.foundrole.com/masidydev-foundrole",
  "indeed":           "mcp.indeed.com/masidydev-indeed",
};

const OLD = "prj_itXje5fuZABu4BYhDnNpY6jBl2Yl";
let patched = 0;

// Patch agent/connections/*.ts
for (const [file, uid] of Object.entries(UID_MAP)) {
  const path = join(ROOT, "agent", "connections", `${file}.ts`);
  if (!existsSync(path)) {
    console.log(`SKIP  ${file}.ts — not found`);
    continue;
  }
  const original = readFileSync(path, "utf8");
  // Replace connect("anything/OLD_UID") with connect("real-uid")
  const updated = original.replace(
    /connect\("([^"]+)"\)/g,
    (_match, current) => {
      if (current.includes(OLD)) return `connect("${uid}")`;
      return _match; // already patched
    }
  );
  if (updated !== original) {
    writeFileSync(path, updated, "utf8");
    console.log(`OK    ${file}.ts -> ${uid}`);
    patched++;
  } else {
    console.log(`SKIP  ${file}.ts — already up to date`);
  }
}

// Patch lib/services-catalog.ts
const catalogPath = join(ROOT, "lib", "services-catalog.ts");
let catalog = readFileSync(catalogPath, "utf8");
const originalCatalog = catalog;

for (const [file, uid] of Object.entries(UID_MAP)) {
  // Replace connectorUid values that still contain the old placeholder
  // The old UIDs have format: "somehost.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"
  // We match by the host prefix from the new UID
  const host = uid.split("/")[0];
  catalog = catalog.replace(
    new RegExp(`${host.replace(/\./g, "\\.")}/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl`, "g"),
    uid
  );
}

if (catalog !== originalCatalog) {
  writeFileSync(catalogPath, catalog, "utf8");
  console.log(`OK    lib/services-catalog.ts`);
  patched++;
}

console.log(`\nPatched ${patched} files.`);

// Commit and push
execSync('git add agent/connections lib/services-catalog.ts', { cwd: ROOT, stdio: "inherit" });
execSync('git commit -m "chore: wire real Vercel Connect connector UIDs for all 30 services"', { cwd: ROOT, stdio: "inherit" });
execSync('git push origin main', { cwd: ROOT, stdio: "inherit" });
console.log("\nDone! Pushed to GitHub.");
console.log("Next: vercel --prod  then visit masidydev.vercel.app/settings");
