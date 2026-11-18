import Link from "next/link";
import "./public-theme.css";

export default function NotFound() {
  return (
    <div className="public-site">
      <main className="not-found">
        <span className="eyebrow">404 / A LITTLE OFF THE PATH</span>
        <h1>
          This corner of
          <br />
          the lab is empty.
        </h1>
        <p>The page may have moved, or the link may need a second look.</p>
        <Link className="button orange" href="/">
          Back to the lab ↗
        </Link>
        <Link href="/products" className="text-link">
          Explore our tools →
        </Link>
      </main>
    </div>
  );
}
