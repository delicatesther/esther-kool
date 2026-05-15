import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";

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
    const state = (await kv.get<{ checkedIds: string[] }>(key())) ?? {
      checkedIds: [],
    };
    return res.status(200).json(state);
  }

  if (req.method === "POST") {
    const { checkedIds } = req.body as { checkedIds: string[] };
    if (!Array.isArray(checkedIds)) {
      return res.status(400).json({ error: "Invalid body" });
    }
    await kv.set(key(), { checkedIds });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end();
}
