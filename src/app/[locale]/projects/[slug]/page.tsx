import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { ExternalLink, GitFork, ArrowLeft } from "lucide-react";

function projectHue(title: string) {
  return title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
}

export default async function ProjectDetailPage(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  const title = locale === "sv" ? project.titleSv : project.titleEn;
  const desc = locale === "sv" ? project.descSv : project.descEn;

  const hasCoverImage = !!project.previewUrl && project.previewType !== "video";
  const hasVideo = !!project.previewUrl && project.previewType === "video";

  const hue = projectHue(title);
  const gradientBg = `linear-gradient(135deg, hsl(${hue},40%,78%) 0%, hsl(${(hue + 45) % 360},35%,68%) 100%)`;
  const decoColor = `hsl(${hue},50%,50%)`;

  return (
    <div>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={
          hasCoverImage
            ? {
                backgroundImage: `url(${project.previewUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { background: gradientBg }
        }
      >
        {/* Overlay: dark scrim on image hero, subtle dark-mode tint on gradient hero */}
        <div
          className={
            hasCoverImage
              ? "absolute inset-0 bg-black/55"
              : "absolute inset-0 bg-black/0 dark:bg-black/40"
          }
        />

        {/* Decorative letter — gradient fallback only */}
        {!hasCoverImage && (
          <span
            className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[16rem] font-bold leading-none opacity-[0.18]"
            style={{ color: decoColor }}
          >
            {title.charAt(0).toUpperCase()}
          </span>
        )}

        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-10 pb-16">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
              hasCoverImage
                ? "text-white/60 hover:text-white"
                : "text-stone-800/70 hover:text-stone-900 dark:text-white/60 dark:hover:text-white"
            }`}
          >
            <ArrowLeft size={14} />
            {t("backToProjects")}
          </Link>

          <h1
            className={`mt-6 text-5xl font-bold tracking-tight ${
              hasCoverImage
                ? "text-white"
                : "text-stone-900 dark:text-white"
            }`}
          >
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  hasCoverImage
                    ? "bg-white/15 text-white"
                    : "bg-black/10 text-stone-800 dark:bg-white/15 dark:text-white"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Video preview — shown below hero */}
        {hasVideo && (
          <div className="-mt-10 mb-10 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg dark:border-zinc-800">
            <video src={project.previewUrl!} controls className="w-full" />
          </div>
        )}

        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {desc}
        </p>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-10 flex flex-wrap gap-4">
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
        )}
      </div>
    </div>
  );
}
