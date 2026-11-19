"use client";

import type { ReactNode } from "react";
import { cleanDisplayText } from "@/lib/content";

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /`([^`]+)`|\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push(cleanDisplayText(text.slice(lastIndex, match.index)));
    }
    if (match[1] !== undefined) {
      out.push(<code key={`c-${key++}`}>{match[1]}</code>);
    } else if (match[2] !== undefined && match[3] !== undefined) {
      out.push(
        <a key={`a-${key++}`} href={match[3]} target="_blank" rel="noopener noreferrer">
          {cleanDisplayText(match[2])}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    out.push(cleanDisplayText(text.slice(lastIndex)));
  }
  return out;
}

export function RichProse({ body }: { body: string }) {
  if (!body) return null;
  const blocks = body.split(/\n\s*\n/).filter((b) => b.trim().length > 0);

  return (
    <>
      {blocks.map((rawBlock, idx) => {
        const block = rawBlock.trim();

        if (block.startsWith("```") && block.endsWith("```") && block.length > 6) {
          const lines = block.slice(3, -3).trim().split("\n");
          const firstLine = lines[0]?.trim() || "";
          const code = /^[a-z0-9_-]{1,20}$/i.test(firstLine) && lines.length > 1 ? lines.slice(1).join("\n") : lines.join("\n");
          return (
            <pre key={idx} className="prose-code-block">
              <code>{code}</code>
            </pre>
          );
        }

        if (block.startsWith("### ")) {
          return <h3 key={idx}>{cleanDisplayText(block.slice(4))}</h3>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={idx}>{cleanDisplayText(block.slice(3))}</h2>;
        }
        if (block.startsWith("> ")) {
          const quoteText = block
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join(" ");
          return <blockquote key={idx}>{renderInline(quoteText)}</blockquote>;
        }

        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length > 1 && lines.every((l) => /^([•*]|-\s)\s*/.test(l))) {
          return (
            <ul key={idx}>
              {lines.map((l, i) => (
                <li key={i}>{renderInline(l.replace(/^([•*]|-)\s+/, ""))}</li>
              ))}
            </ul>
          );
        }
        if (lines.length > 1 && lines.every((l) => /^\d+[.)]\s+/.test(l))) {
          return (
            <ol key={idx}>
              {lines.map((l, i) => (
                <li key={i}>{renderInline(l.replace(/^\d+[.)]\s+/, ""))}</li>
              ))}
            </ol>
          );
        }

        return <p key={idx}>{renderInline(block)}</p>;
      })}
    </>
  );
}
