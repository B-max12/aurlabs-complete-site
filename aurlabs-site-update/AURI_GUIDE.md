# Auri knowledge guide

Auri answers visitors' questions using only what you write in **Admin > Auri knowledge**. It does not invent answers.

## How it finds an answer
1. The question is turned into numbers that capture its meaning (Supabase's built-in `gte-small` model, English only) and compared with your entries. Words are compared too (full-text and similar spelling).
2. Close match: Auri answers with your text. Unsure: it asks "Did you mean...?". No match: it says it doesn't know yet, and the question goes to **Questions Auri couldn't answer** so you can write the answer.

## Writing good entries
- **Question or title**: write it the way a visitor would ask.
- **Other ways people ask this**: add 3 to 8 variations, including the words real people use (for example "ubuntu" when the answer says "Linux"). This is the single biggest quality boost.
- **Answer**: be exact; Auri repeats it word for word. Lines starting `- ` become bullets, `1. ` numbered steps.
- Types: Question & answer, How to use (steps), Feature detail (one entry per feature).
- **Create starter questions** (pick a product first) makes draft entries from the product record: what it is, platforms, download, features, price, how to use, source code, and one per feature. Drafts are invisible to visitors until you edit them and tick **Published**.

## Testing
Use **Try a question** at the top of the page. It shows the answer Auri would give and the match scores. Test with different wordings before publishing.

## Limits and safety
- English only for now.
- A visitor can ask 20 questions per 10 minutes. Questions are stored without any name or address, only to show you what is missing.
- The embedding service is the Supabase Edge Function `embed` (`supabase/functions/embed`), protected by the secret `EMBED_KEY`. If it is ever down, Auri falls back to word matching, and **Re-index** fills in missing meaning data later.
- Cost: the model and tables are part of the Supabase free tier. No AI provider bill.
