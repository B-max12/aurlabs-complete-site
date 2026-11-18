"use client";
import Link from "next/link";
import "./public-theme.css";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="public-site">
      <main className="not-found">
        <span className="eyebrow">A SMALL HICCUP IN THE LAB</span>
        <h1>
          Let’s try that
          <br />
          one more time.
        </h1>
        <p>Something prevented this page from loading. Please retry, or return to the home page.</p>
        <button type="button" className="button orange" onClick={reset}>
          Try again ↗
        </button>
        <Link className="text-link" href="/">
          Back to the lab →
        </Link>
      </main>
    </div>
  );
}
