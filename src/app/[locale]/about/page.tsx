import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {t("heading")}
      </h1>
      <p className="max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
        {t("bio")}
      </p>
    </section>
  );
}
