import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {t("heading")}
      </h1>
      <p className="mb-10 max-w-lg text-lg text-zinc-500 dark:text-zinc-400">
        {t("subtitle")}
      </p>
      <p className="text-zinc-400 dark:text-zinc-500 text-sm">
        Contact form coming soon.
      </p>
    </section>
  );
}
