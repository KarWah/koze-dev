import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage(props: PageProps<"/[locale]/projects">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {t("heading")}
      </h1>

      {projects.length === 0 ? (
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          No projects yet — check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
