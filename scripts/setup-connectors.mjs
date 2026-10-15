#!/usr/bin/env node
/**
 * setup-connectors.mjs
 *
 * Creates all 30 Vercel Connect connectors for masidydev,
 * attaches them to the Vercel project, then patches all
 * connection files and the services catalog with real UIDs.
 *
 * Usage (from project root):
 *   node scripts/setup-connectors.mjs
 *
 * Prerequisites:
 *   - vercel CLI installed and logged in
 *   - project linked (vercel link)
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Helpers ──────────────────────────────────────────────────────────────────

function run(cmd, silent = false) {
  try {
    return execSync(cmd, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: silent ? ["pipe", "pipe", "pipe"] : ["pipe", "pipe", "pipe"],
    });
  } catch (err) {
    return err.stdout || "";
  }
}

function runJSON(cmd) {
  const out = run(cmd, true);
  try {
    return JSON.parse(out);
  } catch {
    return null;
  }
}

function log(msg, color = "reset") {
  const codes = { green: "\x1b[32m", red: "\x1b[31m", yellow: "\x1b[33m", cyan: "\x1b[36m", reset: "\x1b[0m" };
  console.log(`${codes[color] ?? ""}${msg}${codes.reset}`);
}

// ── 1. Check project is linked ────────────────────────────────────────────────

const projectJsonPath = join(ROOT, ".vercel", "project.json");
if (!existsSync(projectJsonPath)) {
  log("ERROR: Project not linked. Run: vercel link", "red");
  process.exit(1);
}
const { projectId: PROJECT_ID } = JSON.parse(readFileSync(projectJsonPath, "utf8"));
log(`Project ID: ${PROJECT_ID}`, "cyan");

// ── 2. Connector definitions ──────────────────────────────────────────────────
// type  = the service host passed to `vercel connect create <type>`
// name  = the slug; Vercel forms the UID as "<type>/<name>"  (note: reversed from what we saw)
//         Actually the UID from the test was: mcp.stripe.com/masidydev-stripe
//         so UID = "<type>/<name>"
// file  = agent/connections/<file>.ts

const CONNECTORS = [
  // Infra & Deploy
  { type: "mcp.vercel.com",              name: "masidydev-vercel",     file: "vercel" },
  { type: "netlify-mcp.netlify.app",     name: "masidydev-netlify",    file: "netlify" },
  { type: "mcp.cloudflare.com",          name: "masidydev-cloudflare", file: "cloudflare" },
  { type: "mcp.supabase.com",            name: "masidydev-supabase",   file: "supabase" },
  { type: "mcp.upstash.com",             name: "masidydev-upstash",    file: "upstash-redis" },
  // Dev & Code
  { type: "mcp.postman.com",             name: "masidydev-postman",    file: "postman" },
  { type: "api.lovable.dev",             name: "masidydev-lovable",    file: "lovable" },
  { type: "huggingface.co",              name: "masidydev-hf",         file: "hugging-face" },
  { type: "mcp.sanity.io",              name: "masidydev-sanity",     file: "sanity" },
  // Project Management
  { type: "mcp.linear.app",             name: "masidydev-linear",     file: "linear" },
  { type: "mcp.notion.com",             name: "masidydev-notion",     file: "notion" },
  { type: "mcp.lucid.app",              name: "masidydev-lucid",      file: "lucid" },
  { type: "mcp.jotform.com",            name: "masidydev-jotform",    file: "jotform" },
  // Marketing & Content
  { type: "mcp.adaptlypost.com",        name: "masidydev-adaptly",    file: "adaptlypost" },
  { type: "mcp.bulkpublish.com",        name: "masidydev-bulk",       file: "bulkpublish" },
  { type: "ai-inc.mailchimp.com",       name: "masidydev-mailchimp",  file: "intuit-mailchimp" },
  { type: "mcp.resend.com",             name: "masidydev-resend",     file: "resend" },
  { type: "api.titan.email",            name: "masidydev-titan",      file: "titan-email" },
  { type: "mcp.hcti.io",                name: "masidydev-hcti",       file: "html-css-to-image" },
  { type: "express-mcp-service.adobe.io", name: "masidydev-adobe",   file: "adobe" },
  // CRM & Sites
  { type: "app.anvilcrm.com",           name: "masidydev-anvil",      file: "anvil-crm" },
  { type: "mcp.webflow.com",            name: "masidydev-webflow",    file: "webflow" },
  { type: "mcp.wix.com",                name: "masidydev-wix",        file: "wix" },
  // Payments — stripe already created manually
  { type: "mcp.stripe.com",             name: "masidydev-stripe",     file: "stripe" },
  { type: "mcp.paypal.com",             name: "masidydev-paypal",     file: "paypal" },
  // Automation
  { type: "mcp.make.com",               name: "masidydev-make",       file: "make" },
  { type: "mcp.zapier.com",             name: "masidydev-zapier",     file: "zapier" },
  // Media & Video
  { type: "faceless.so",                name: "masidydev-faceless",   file: "faceless" },
  { type: "api.vidmoat.com",            name: "masidydev-vidmoat",    file: "vidmoat" },
  // Agent Identity
  { type: "mcp.agentmail.to",           name: "masidydev-agentmail",  file: "agentmail" },
  { type: "mcp.agentphone.ai",          name: "masidydev-agentphone", file: "agentphone" },
  { type: "mcp.agentcard.sh",           name: "masidydev-agentcard",  file: "agentcard" },
  { type: "agent-loadout.com",          name: "masidydev-loadout",    file: "agent-loadout" },
  { type: "platform.salespeak.ai",      name: "masidydev-salespeak",  file: "salespeak" },
  // Research & Analytics
  { type: "www.firecrawl.dev",          name: "masidydev-firecrawl",  file: "firecrawl" },
  { type: "mcp.search1api.com",         name: "masidydev-search1",    file: "search1api" },
  { type: "mcp.amplitude.com",          name: "masidydev-amplitude",  file: "amplitude" },
  { type: "mcp.datadoghq.com",          name: "masidydev-datadog",    file: "datadog" },
  { type: "mcp.localfalcon.com",        name: "masidydev-falcon",     file: "local-falcon" },
  // Jobs & Hiring
  { type: "www.foundrole.com",          name: "masidydev-foundrole",  file: "foundrole" },
  { type: "mcp.indeed.com",             name: "masidydev-indeed",     file: "indeed" },
];

// ── 3. Get existing connectors (to skip already created ones) ─────────────────

log("\nFetching existing connectors...", "cyan");
const existingData = runJSON("vercel connect list --format=json 2>&1");
const existingByUID = new Map();
const existingByName = new Map();
for (const c of (existingData?.connectors ?? [])) {
  existingByUID.set(c.uid, c.uid);
  existingByName.set(c.name, c.uid);
}
log(`  Found ${existingByUID.size} existing connectors.`);

// ── 4. Create connectors and collect results ──────────────────────────────────

log("\nCreating connectors...", "cyan");
const results = new Map(); // file -> uid
const failed = [];

for (const c of CONNECTORS) {
  const expectedUID = `${c.type}/${c.name}`;

  // Check if already exists by UID or by name
  if (existingByUID.has(expectedUID)) {
    log(`  SKIP ${c.file} — already exists: ${expectedUID}`);
    results.set(c.file, expectedUID);
    run(`vercel connect attach "${expectedUID}" --project ${PROJECT_ID} --yes 2>&1`, true);
    continue;
  }

  // Try creating
  const raw = run(`vercel connect create ${c.type} --name ${c.name} --format=json 2>&1`, true);
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch { /* ignore */ }

  if (parsed?.uid) {
    const uid = parsed.uid;
    results.set(c.file, uid);
    log(`  OK   ${c.file} — ${uid}`, "green");
    // Attach to project
    run(`vercel connect attach "${uid}" --project ${PROJECT_ID} --yes 2>&1`, true);
  } else {
    // May already exist under a slightly different name — check the list again
    const listRaw = runJSON("vercel connect list --format=json 2>&1");
    const match = (listRaw?.connectors ?? []).find(
      (x) => x.uid.startsWith(c.type + "/") && x.uid.includes(c.name)
    );
    if (match) {
      results.set(c.file, match.uid);
      log(`  FOUND ${c.file} — ${match.uid}`, "green");
      run(`vercel connect attach "${match.uid}" --project ${PROJECT_ID} --yes 2>&1`, true);
    } else {
      log(`  FAIL  ${c.file} — could not create. Output: ${raw.slice(0, 120)}`, "red");
      failed.push(c.file);
    }
  }
}

// ── 5. Patch agent/connections/*.ts files ────────────────────────────────────

log("\nPatching connection files...", "cyan");
const OLD_UID_PATTERN = /prj_itXje5fuZABu4BYhDnNpY6jBl2Yl/g;

for (const [file, uid] of results) {
  const path = join(ROOT, "agent", "connections", `${file}.ts`);
  if (!existsSync(path)) {
    log(`  SKIP ${file}.ts — not found`, "yellow");
    continue;
  }
  const original = readFileSync(path, "utf8");
  // Replace the old project UID with the new connector-specific UID
  // connect("mcp.stripe.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl") -> connect("mcp.stripe.com/masidydev-stripe")
  const patched = original.replace(
    /connect\("([^"]+)\/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl"\)/g,
    `connect("${uid}")`
  );
  if (patched !== original) {
    writeFileSync(path, patched, "utf8");
    log(`  PATCHED ${file}.ts -> ${uid}`, "green");
  } else {
    log(`  NO-CHANGE ${file}.ts`);
  }
}

// ── 6. Patch lib/services-catalog.ts ─────────────────────────────────────────

log("\nPatching services catalog...", "cyan");
const catalogPath = join(ROOT, "lib", "services-catalog.ts");
let catalog = readFileSync(catalogPath, "utf8");

for (const c of CONNECTORS) {
  if (!results.has(c.file)) continue;
  const uid = results.get(c.file);
  // Replace: "mcp.stripe.com/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl" -> "mcp.stripe.com/masidydev-stripe"
  const oldUid = `${c.type}/prj_itXje5fuZABu4BYhDnNpY6jBl2Yl`;
  catalog = catalog.replaceAll(oldUid, uid);
}
writeFileSync(catalogPath, catalog, "utf8");
log("  PATCHED lib/services-catalog.ts", "green");

// ── 7. Commit and push ────────────────────────────────────────────────────────

log("\nCommitting changes...", "cyan");
run('git add agent/connections lib/services-catalog.ts scripts/');
run('git commit -m "chore: wire real Vercel Connect connector UIDs for all 30 services"');
run('git push origin main');
log("  Pushed to GitHub.", "green");

// ── 8. Summary ────────────────────────────────────────────────────────────────

log("\n========================================", "cyan");
log(`DONE: ${results.size} connectors ready`, "green");
if (failed.length > 0) {
  log(`FAILED (${failed.length}): ${failed.join(", ")}`, "red");
  log("Re-run this script to retry failed connectors.", "yellow");
}
log("\nNext steps:", "cyan");
log("  1. vercel --prod   (deploy to production)");
log("  2. Open https://masidydev.vercel.app/settings");
log("  3. Users can now click Connect on any service!");
log("========================================\n", "cyan");
