"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/** Persistent Dark/Light theme toggle synced across tabs and header instances. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const read = (): Theme => {
      try {
        const saved = localStorage.getItem("aur-theme-pearl");
        if (saved === "light" || saved === "dark") return saved;
      } catch {}
      return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    };

    const current = read();
    document.documentElement.dataset.theme = current;
    setTheme(current);

    const onSync = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      if (next === "light" || next === "dark") setTheme(next);
    };
    window.addEventListener("aur-theme-change", onSync);
    return () => window.removeEventListener("aur-theme-change", onSync);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("aur-theme-pearl", next);
    } catch {}
    window.dispatchEvent(new CustomEvent<Theme>("aur-theme-change", { detail: next }));
  };

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
