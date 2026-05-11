import { NextResponse } from "next/server";

const PAGE_SIZE = 20;
const SERPAPI_URL = "https://serpapi.com/search.json";

function extractLocation(snippet, displayedLink) {
  if (!snippet && !displayedLink) return "";
  const text = snippet || "";
  const stateMatch = text.match(/\b(?:in|at|,)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/);
  if (stateMatch) return stateMatch[1].trim();
  if (displayedLink && typeof displayedLink === "string") {
    const part = displayedLink.split("›")[0]?.trim();
    return part || "";
  }
  return "";
}

function mapOrganicResult(r) {
  const thumbnail = r.thumbnail || r.favicon || null;
  return {
    name: (r.title || "Untitled").trim(),
    description: (r.snippet || r.snippet_highlighted_words?.join(" ") || "").trim(),
    image: thumbnail,
    website_link: r.link || "",
    location: extractLocation(r.snippet, r.displayed_link)
  };
}

function mapKnowledgeGraph(kg, fallbackQuery) {
  if (!kg) return null;
  let link = "";
  if (typeof kg.website === "string") link = kg.website;
  else if (kg.website?.link) link = kg.website.link;
  else if (typeof kg.header_web_site === "string") link = kg.header_web_site;
  else if (kg.source?.link) link = kg.source.link;

  const img =
    (typeof kg.image === "string" && kg.image) ||
    (Array.isArray(kg.header_images) && kg.header_images[0]?.image) ||
    null;

  const subtitle = kg.subtitle || kg.type || "";
  const desc = kg.description || kg.subtitle || "";

  return {
    name: (kg.title || fallbackQuery || "Result").trim(),
    description: String(desc).trim(),
    image: img,
    website_link: link,
    location: String(subtitle).trim()
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";
  const pageRaw = parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  if (!q) {
    return NextResponse.json({
      results: [],
      page: 1,
      hasMore: false,
      error: null
    });
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        results: [],
        page,
        hasMore: false,
        error: "College search is not configured. Add SERPAPI_KEY to .env.local."
      },
      { status: 503 }
    );
  }

  const start = (page - 1) * PAGE_SIZE;
  const searchQuery = `${q} college university official website logo`;

  const params = new URLSearchParams({
    engine: "google",
    q: searchQuery,
    api_key: apiKey,
    num: String(PAGE_SIZE),
    start: String(start),
    hl: "en",
    gl: "in"
  });

  try {
    const res = await fetch(`${SERPAPI_URL}?${params.toString()}`, { cache: "no-store" });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        {
          results: [],
          page,
          hasMore: false,
          error: data.error || "Search request failed."
        },
        { status: res.status >= 400 ? res.status : 502 }
      );
    }

    if (data.error) {
      return NextResponse.json(
        {
          results: [],
          page,
          hasMore: false,
          error: typeof data.error === "string" ? data.error : "SerpApi returned an error."
        },
        { status: 400 }
      );
    }

    const organic = Array.isArray(data.organic_results) ? data.organic_results : [];
    let colleges = organic.map(mapOrganicResult).filter((c) => c.website_link);

    if (page === 1 && data.knowledge_graph) {
      const kgCard = mapKnowledgeGraph(data.knowledge_graph, q);
      if (kgCard?.website_link) {
        const exists = colleges.some((c) => c.website_link === kgCard.website_link);
        if (!exists) {
          colleges = [kgCard, ...colleges];
        }
      }
    }

    const seen = new Set();
    colleges = colleges.filter((c) => {
      const key = c.website_link;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const pagination = data.serpapi_pagination || data.pagination;
    const hasMore = Boolean(pagination?.next) || organic.length >= PAGE_SIZE;

    return NextResponse.json({
      results: colleges,
      page,
      hasMore,
      error: null
    });
  } catch {
    return NextResponse.json(
      {
        results: [],
        page,
        hasMore: false,
        error: "Unable to reach search service. Try again later."
      },
      { status: 500 }
    );
  }
}
