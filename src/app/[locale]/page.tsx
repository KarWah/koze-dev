import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const tf = await getTranslations({ locale, namespace: "featured" });

  const featured = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-28 sm:py-40">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Portfolio
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl lg:text-7xl">
          {t("greeting")}
        </h1>
        <p className="mb-10 max-w-xl text-xl text-zinc-500 dark:text-zinc-400">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {t("cta_projects")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
          >
            {t("cta_contact")}
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="mb-10 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {tf("heading")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
