import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";

export default async function HomePage(props: { params: { locale: string } }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const tf = await getTranslations({ locale, namespace: "featured" });

  const featured = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-6 py-28 sm:py-40">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
            
            {/* Left Side: Profile Image */}
            <div className="shrink-0">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-stone-100 shadow-xl shadow-stone-200/50 dark:border-stone-800 dark:shadow-none sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                <Image
                  src="/assets/profile.jpg"
                  alt="Karl Wahrenberg"
                  fill
                  className="object-cover"
                  priority // Tells Next.js to load this image instantly
                />
              </div>
            </div>
      
            {/* Right Side: Text Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-stone-400 dark:text-stone-500">
                Portfolio
              </p>
              <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-6xl lg:text-7xl">
                {t("greeting")}
              </h1>
              <p className="mx-auto mb-10 max-w-prose text-xl leading-loose text-stone-600 dark:text-stone-400 md:mx-0">
                {t("subtitle")}
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <Link
                  href="/projects"
                  className="inline-flex h-11 items-center rounded-full bg-orange-800 px-6 text-sm font-semibold text-stone-50 transition-colors hover:bg-orange-700 dark:bg-orange-900 dark:text-stone-100 dark:hover:bg-orange-800"
                >
                  {t("cta_projects")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-full border border-stone-300 px-6 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400 hover:bg-white dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  {t("cta_contact")}
                </Link>
              </div>
            </div>
      
          </div>
        </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="border-t border-stone-200 dark:border-stone-800">
          <div className="mx-auto max-w-5xl px-6 pt-20 pb-40">
            <h2 className="mb-10 font-serif text-2xl font-semibold tracking-tight text-stone-800 dark:text-stone-100">
              {tf("heading")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/projects"
                className="text-sm font-medium text-stone-400 transition-colors hover:text-stone-700 dark:hover:text-stone-300"
              >
                {tf("viewAll")} →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}