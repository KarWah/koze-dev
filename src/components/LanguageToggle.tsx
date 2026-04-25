"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "en" ? "sv" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      aria-label={locale === "en" ? "Switch to Swedish" : "Byt till engelska"}
      className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      <span className={locale === "en" ? "text-zinc-900 dark:text-zinc-100" : ""}>EN</span>
      <span className="text-zinc-300 dark:text-zinc-600">/</span>
      <span className={locale === "sv" ? "text-zinc-900 dark:text-zinc-100" : ""}>SV</span>
    </button>
  );
}
