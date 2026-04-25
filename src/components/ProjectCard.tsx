"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ExternalLink, ArrowRight, ChevronDown } from "lucide-react";

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

function titleGradient(title: string) {
  const hue = title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return {
    bg: `linear-gradient(135deg, hsl(${hue},40%,78%) 0%, hsl(${(hue + 45) % 360},35%,68%) 100%)`,
    letter: `hsl(${hue},50%,28%)`,
  };
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
  const [expanded, setExpanded] = useState(false);

  const title = locale === "sv" ? project.titleSv : project.titleEn;
  const desc = locale === "sv" ? project.descSv : project.descEn;

  const previewSrc =
    project.previewUrl ??
    (project.liveUrl ? microlinkUrl(project.liveUrl) : null);

  const grad = titleGradient(title);
  const hasImage = previewSrc && !imgError;

  return (
    <article className="group flex flex-col rounded-[2rem] border border-stone-200 bg-white/70 overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-stone-700">
      {/* Preview */}
      <div
        className="aspect-video w-full overflow-hidden cursor-pointer"
        style={!hasImage ? { background: grad.bg } : undefined}
        onClick={() => setExpanded((v) => !v)}
      >
        {hasImage ? (
          <img
            src={previewSrc}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="text-6xl font-bold select-none"
              style={{ color: grad.letter }}
            >
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Title row — always visible, click to expand */}
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-6 pt-5 pb-4 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <h2 className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-100">
          {title}
        </h2>
        <ChevronDown
          size={18}
          className={`shrink-0 text-stone-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable content — toggled by click, stays open while reading */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">
            <p className="mb-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              {desc}
            </p>

            {/* Tech tags */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:bg-zinc-800 dark:text-stone-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push(`/projects/${project.slug}`)}
                className="flex items-center gap-1 text-sm font-medium text-stone-900 hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300 transition-colors"
              >
                {t("viewProject")}
                <ArrowRight size={14} />
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
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
  );
}
