"use client";

import { useRouter } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const localePattern = new RegExp(`^/(${routing.locales.join("|")})(/|$)`);

export default function LanguageToggle() {
  const router = useRouter();
  const rawPathname = usePathname();

  const locale = routing.locales.find(
    (l) => rawPathname === `/${l}` || rawPathname.startsWith(`/${l}/`)
  ) ?? routing.defaultLocale;

  const toggle = () => {
    const next = locale === "en" ? "sv" : "en";
    const clean = rawPathname.replace(localePattern, "/").replace(/\/$/, "") || "/";
    router.replace(clean, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      aria-label={locale === "en" ? "Switch to Swedish" : "Byt till engelska"}
      className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
    >
      <span className={locale === "en" ? "text-stone-900 dark:text-stone-100" : ""}>EN</span>
      <span className="text-stone-300 dark:text-stone-600">/</span>
      <span className={locale === "sv" ? "text-stone-900 dark:text-stone-100" : ""}>SV</span>
    </button>
  );
}