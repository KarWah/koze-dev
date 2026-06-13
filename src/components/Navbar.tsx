"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/projects", labelKey: "projects" },
  { href: "/contact", labelKey: "contact" },
  { href: "/stack", labelKey: "setup" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-stone-900 hover:opacity-80 dark:text-stone-100"
        >
          koze.dev
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "text-sm font-medium transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-stone-900 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              )}
            >
              {t(labelKey)}
            </Link>
          ))}
          <LanguageToggle />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile nav */}
      {open && (
        <div className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={clsx(
                "text-sm font-medium transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-stone-900 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              )}
            >
              {t(labelKey)}
            </Link>
          ))}
          <LanguageToggle />
        </div>
      )}
    </header>
  );
}
