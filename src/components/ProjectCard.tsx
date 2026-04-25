"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ExternalLink, ArrowRight } from "lucide-react";

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

function microlinkUrl(siteUrl: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
}

export default function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = useTranslations("projects");
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const title = locale === "sv" ? project.titleSv : project.titleEn;
  const desc = locale === "sv" ? project.descSv : project.descEn;

  const previewSrc =
    project.previewUrl ??
    (project.liveUrl ? microlinkUrl(project.liveUrl) : null);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => router.push(`/projects/${project.slug}`)}
    >
      <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
        {/* Preview */}
        <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          {previewSrc && !imgError ? (
            <img
              src={previewSrc}
              alt={title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-3xl font-bold text-zinc-300 dark:text-zinc-600 select-none">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Title — always visible */}
        <div className="px-5 pt-5 pb-5">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
        </div>

        {/* Expandable content — hidden by default, revealed on hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
          <div className="overflow-hidden">
            <div className="px-5 pb-5">
              <p className="mb-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
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

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {t("viewProject")}
                  <ArrowRight size={14} />
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink size={14} />
                    {t("liveDemo")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
