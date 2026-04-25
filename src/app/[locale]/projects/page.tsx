import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {t("heading")}
      </h1>
      <p className="text-zinc-400 dark:text-zinc-500 text-sm">
        Projects will load here once the database is connected.
      </p>
    </section>
  );
}
