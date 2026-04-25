import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";

type Project = {
  slug: string;
  titleEn: string;
  titleSv: string;
  descEn: string;
  descSv: string;
  techStack: string[];
  previewUrl: string | null;
  liveUrl: string | null;
};

export default function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = useTranslations("projects");
  const title = locale === "sv" ? project.titleSv : project.titleEn;
  const desc = locale === "sv" ? project.descSv : project.descEn;

  return (
    <article className="group flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Preview */}
      <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        {project.previewUrl ? (
          <img
            src={project.previewUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-600 select-none">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
          {desc}
        </p>

        {/* Tech tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            {t("viewProject")} →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <ExternalLink size={14} />
              {t("liveDemo")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
