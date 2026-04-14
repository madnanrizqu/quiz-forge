import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
  DB: D1Database;
  API_TOKEN: string;
}

export function nowISO(): string {
  return new Date().toISOString().replace("T", " ").replace("Z", "");
}
