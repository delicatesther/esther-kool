import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export type CollectionState = Record<string, number>;

function key() {
  return `household:${process.env.HOUSEHOLD_ID}:collection`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env.HOUSEHOLD_ID) {
    return res.status(503).json({ error: "HOUSEHOLD_ID not configured" });
  }

  if (req.method === "GET") {
    const state = (await redis.get<CollectionState>(key())) ?? {};
    return res.status(200).json(state);
  }

  if (req.method === "POST") {
    const state = req.body as CollectionState;
    if (typeof state !== "object" || Array.isArray(state)) {
      return res.status(400).json({ error: "Invalid body" });
    }
    await redis.set(key(), JSON.stringify(state));
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end();
}
