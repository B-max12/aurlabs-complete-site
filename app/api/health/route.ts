import { readContent, json } from "@/lib/server";
import { defaultContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  let content = defaultContent;
  let storage: "connected" | "fallback" = "connected";
  try {
    content = await readContent();
  } catch {
    storage = "fallback";
  }

  return json({
    ok: true,
    status: storage === "connected" ? "healthy" : "degraded",
    storage,
    counts: {
      products: content.products.length,
      releasedProducts: content.products.filter((p) => p.status === "released").length,
      journal: content.journal.length,
      research: content.research.length,
    },
    timestamp: new Date().toISOString(),
  });
}
