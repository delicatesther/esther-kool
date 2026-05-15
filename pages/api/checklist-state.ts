import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function key() {
  return `household:${process.env.HOUSEHOLD_ID}:checklist`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env.HOUSEHOLD_ID) {
    return res.status(503).json({ error: "HOUSEHOLD_ID not configured" });
  }

  if (req.method === "GET") {
    const state = (await redis.get<{ checkedIds: string[] }>(key())) ?? {
      checkedIds: [],
    };
    return res.status(200).json(state);
  }

  if (req.method === "POST") {
    const { checkedIds } = req.body as { checkedIds: string[] };
    if (!Array.isArray(checkedIds)) {
      return res.status(400).json({ error: "Invalid body" });
    }
    await redis.set(key(), JSON.stringify({ checkedIds }));
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end();
}
