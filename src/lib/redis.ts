import { Redis } from "@upstash/redis";
import type { Lead } from "./lead-types";

// Support both the Vercel KV-style and Upstash-native env var names.
function readConfig(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
  if (!url || !token) return null;
  return { url, token };
}

export function isRedisConfigured(): boolean {
  return readConfig() !== null;
}

let client: Redis | null = null;

function getRedis(): Redis {
  const config = readConfig();
  if (!config) {
    throw new Error("Redis is not configured (missing KV/Upstash env vars).");
  }
  if (!client) {
    client = new Redis({ url: config.url, token: config.token });
  }
  return client;
}

const LEAD_KEY = (id: string) => `lead:${id}`;
const INDEX_KEY = "leads:index"; // sorted set: score = createdAt, member = id
const COUNTER_KEY = "leads:counter";

export type NewLead = Omit<Lead, "id" | "createdAt" | "read">;

export async function createLead(data: NewLead): Promise<Lead> {
  const redis = getRedis();
  const n = await redis.incr(COUNTER_KEY);
  const createdAt = Date.now();
  const id = String(n);
  const lead: Lead = { id, createdAt, read: false, ...data };
  await redis.set(LEAD_KEY(id), JSON.stringify(lead));
  await redis.zadd(INDEX_KEY, { score: createdAt, member: id });
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  const redis = getRedis();
  // Newest first
  const ids = await redis.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true });
  if (!ids.length) return [];
  const keys = ids.map(LEAD_KEY);
  const raw = await redis.mget<(Lead | string | null)[]>(...keys);
  const leads: Lead[] = [];
  for (const item of raw) {
    if (!item) continue;
    // Upstash may auto-deserialize JSON strings into objects.
    const lead = typeof item === "string" ? (JSON.parse(item) as Lead) : (item as Lead);
    leads.push(lead);
  }
  return leads;
}

export async function setLeadRead(id: string, read: boolean): Promise<void> {
  const redis = getRedis();
  const raw = await redis.get<Lead | string | null>(LEAD_KEY(id));
  if (!raw) return;
  const lead = typeof raw === "string" ? (JSON.parse(raw) as Lead) : (raw as Lead);
  lead.read = read;
  await redis.set(LEAD_KEY(id), JSON.stringify(lead));
}

export async function deleteLead(id: string): Promise<void> {
  const redis = getRedis();
  await redis.del(LEAD_KEY(id));
  await redis.zrem(INDEX_KEY, id);
}
