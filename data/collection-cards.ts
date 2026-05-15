export type CollectionCard = {
  id: string;
  title: string;
  category: string;
};

export type CollectionCategory = {
  id: string;
  title: string;
};

// ── Active promotion ───────────────────────────────────────────────────────────
// To start a new promotion: replace the arrays below and deploy.
// IDs must be unique and stable (changing them resets counts for that card).

export const COLLECTION_CATEGORIES: CollectionCategory[] = [
  // Example — replace with real categories:
  // { id: "hollandse-helden", title: "Hollandse Helden" },
];

export const COLLECTION_CARDS: CollectionCard[] = [
  // Example — replace with real cards:
  // { id: "hh-01", title: "Kaart 1", category: "hollandse-helden" },
];
