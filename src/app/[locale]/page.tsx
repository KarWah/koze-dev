import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";

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
          <FadeUp delay={0.1}>
            <div className="shrink-0 animate-float">
              <div className="relative h-48 w-48 overflow-hidden rounded-[2rem] border border-stone-200/50 bg-white/50 p-2 shadow-2xl shadow-stone-200/50 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/50 dark:shadow-none sm:h-56 sm:w-56 lg:h-64 lg:w-64 rotate-[-2deg] transition-transform hover:rotate-0 duration-500">              
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/assets/profile.jpg"
                      alt="Karl Wahrenberg"
                      fill
                      sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                      className="object-cover"
                      priority 
                    />
                  </div>
              </div>
            </div>
          </FadeUp>
    
          {/* Right Side: Text Content */}
          <div className="flex-1 text-center md:text-left pt-4">
            <FadeUp delay={0.2}>
              <span className="mb-6 inline-block rounded-full bg-stone-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-500 dark:bg-stone-800/50 dark:text-stone-400 border border-stone-200 dark:border-stone-800">
                Portfolio
              </span>
            </FadeUp>

            <FadeUp delay={0.3}>
              <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-6xl lg:text-7xl leading-[1.1]">
                {t("greeting")}
              </h1>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="mx-auto mb-10 max-w-prose text-xl leading-relaxed text-stone-600 dark:text-stone-400 md:mx-0">
                {t("subtitle")}
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <Link
                  href="/projects"
                  className="inline-flex h-12 items-center rounded-full bg-orange-700 px-8 text-sm font-semibold text-stone-50 transition-all hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(194,65,12,0.3)] dark:bg-orange-800 dark:text-stone-100 dark:hover:bg-orange-700"
                >
                  {t("cta_projects")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm px-8 text-sm font-semibold text-stone-700 transition-all hover:border-stone-400 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  {t("cta_contact")}
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="border-t border-stone-200 dark:border-stone-800">
          <div className="mx-auto max-w-5xl px-6 pt-20 pb-40">
            <FadeUp delay={0.2}>
              <h2 className="mb-10 font-serif text-2xl font-semibold tracking-tight text-stone-800 dark:text-stone-100">
                {tf("heading")}
              </h2>
            </FadeUp>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project, index) => (
                <FadeUp key={project.id} delay={0.3 + (index * 0.1)}>
                  <ProjectCard project={project} locale={locale} />
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.6}>
              <div className="mt-12 text-center">
                <Link
                  href="/projects"
                  className="text-sm font-medium text-stone-400 transition-colors hover:text-stone-700 dark:hover:text-stone-300"
                >
                  {tf("viewAll")} →
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      )}
    </>
  );
}