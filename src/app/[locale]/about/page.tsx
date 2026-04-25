import { getTranslations } from "next-intl/server";
import Image from "next/image";

const skillGroups = [
  {
    label: "Frontend",
    skills: ["Next.js & React", "TypeScript"],
  },
  {
    label: "Backend & Data",
    skills: ["Python", "PostgreSQL", "Redis"],
  },
  {
    label: "Systems",
    skills: ["C++ & C#"],
  },
  {
    label: "Creative & AI",
    skills: ["Godot 4", "AI & Computer Vision"],
  },
];

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(28,45%,80%) 0%, hsl(12,42%,72%) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40" />
        <span className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[16rem] font-bold leading-none opacity-[0.15] text-[hsl(15,50%,45%)]">
          K
        </span>

        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-12 pb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-stone-700/60 dark:text-white/50">
            Karl Wahrenberg
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-stone-900 dark:text-white">
            {t("heading")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* Bio row */}
        <div className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          <div className="shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-stone-200 shadow-md dark:border-stone-800">
              <Image
                src="/assets/profile.jpg"
                alt="Karl Wahrenberg"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-lg leading-loose text-stone-600 dark:text-stone-400">
            {t("bio")}
          </p>
        </div>

        {/* Skills */}
        <h2 className="mb-8 font-serif text-2xl font-semibold text-stone-800 dark:text-stone-100">
          {t("skills")}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-600">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-transform hover:-translate-y-0.5 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
