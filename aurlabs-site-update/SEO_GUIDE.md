# SEO guide for Aur Labs

## What the site does automatically
- Every product has its own page at `/products/<slug>` with its own title, description, canonical link, Open Graph and Twitter card, and structured data (SoftwareApplication, BreadcrumbList and, if you add questions, FAQPage).
- `/sitemap.xml` lists all public pages, products, journal and research articles. It refreshes itself when you save in the admin.
- `/robots.txt` allows search engines everywhere except `/admin` and `/api/` (uploaded images stay crawlable).
- The admin page is marked `noindex`.
- Public pages are cached for a minute and refreshed immediately when you save in the admin.

## Filling the "Search appearance" box (admin > Products > edit)
| Field | What to write |
|---|---|
| Main search phrase | The one phrase you want people to find the product by, for example `privacy-first download manager`. Only claim what the product really does. |
| Search title | 50 to 60 characters. Main phrase first, product name last. Example: `Privacy-first download manager for Linux & Windows \| Aurelis` |
| Search description | 120 to 155 characters. What it does, who it is for, one proof point (free, open source, no telemetry). |
| Questions and answers | Real questions people ask. First line is the question, following lines the answer, blank line between pairs. Two to six is plenty. |

The checklist under the fields turns green when lengths are right and the phrase appears in the title, description and product text.

Leave a field empty and the name, tagline and description are used instead.

## One-time setup in Google Search Console
1. Open Search Console and add the property `aurlabs.online` (domain property). The verification TXT record is already in DNS.
2. Sitemaps > add `https://aurlabs.online/sitemap.xml`.
3. URL inspection > paste the product page URL > Request indexing. Repeat for each new product.
4. Do the same in Bing Webmaster Tools (you can import from Search Console).

## What actually moves rankings
- Pages that match what people are looking for (clear title, a visible H1, honest content).
- Links from other sites: GitHub README, Product Hunt, Show HN, relevant subreddits (follow their rules), AlternativeTo, and helpful journal articles on the site.
- Speed and mobile usability (already tuned).
- Time. A new domain needs weeks to months before it ranks for competitive phrases. Start with specific, long phrases.

## Avoid
- The old "meta keywords" tag: Google ignores it.
- Repeating the phrase unnaturally, or many near-identical pages for each platform or keyword.
- Claiming features the product does not have.
