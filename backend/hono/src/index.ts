import { env } from "cloudflare:workers";
import type { D1Database } from "@cloudflare/workers-types";
import { createApp } from "./app";

const app = createApp(env as { DB: D1Database; API_TOKEN: string });

export default {
  fetch: app.fetch,
};
