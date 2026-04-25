import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { ExternalLink, GitFork } from "lucide-react";

export default async function ProjectDetailPage(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  const title = locale === "sv" ? project.titleSv : project.titleEn;
  const desc = locale === "sv" ? project.descSv : project.descEn;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/projects"
        className="mb-8 inline-block text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
      >
        {t("backToProjects")}
      </Link>

      {/* Preview */}
      {project.previewUrl && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          {project.previewType === "video" ? (
            <video
              src={project.previewUrl}
              controls
              className="w-full"
            />
          ) : (
            <img
              src={project.previewUrl}
              alt={title}
              className="w-full object-cover"
            />
          )}
        </div>
      )}

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>

      {/* Tech tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {desc}
      </p>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <ExternalLink size={15} />
            {t("liveDemo")}
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <GitFork size={15} />
            {t("sourceCode")}
          </a>
        )}
      </div>
    </article>
  );
}
