import { getTranslations } from "next-intl/server";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";

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
      <div className="relative overflow-hidden border-b border-stone-200/50 bg-gradient-to-br from-orange-100/60 via-stone-100 to-orange-50/80 dark:border-white/5 dark:from-stone-900 dark:via-stone-900 dark:to-orange-950/20">
        
        {/* Film Grain */}
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30 dark:opacity-10" />
        
        {/* Decorative letter */}
        <span className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[18rem] font-black leading-none text-orange-500/10 blur-[2px] mix-blend-multiply dark:text-orange-500/5 dark:mix-blend-screen">
          K
        </span>

        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-20">
          <FadeUp delay={0.1}>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-orange-800/70 dark:text-orange-200/50">
              Karl Wahrenberg
            </p>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h1 className="text-5xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-6xl">
              {t("heading")}
            </h1>
          </FadeUp>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        
        {/* Bio row */}
        <FadeUp delay={0.3}>
          <div className="mb-20 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">           
             <div className="shrink-0">
               <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-stone-200 shadow-xl dark:border-stone-800 dark:shadow-none">
                 <Image
                   src="/assets/profile.jpg"
                   alt="Karl Wahrenberg"
                   fill
                   sizes="112px"
                   className="object-cover"
                 />
               </div>
             </div>
            <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              {t("bio")}
            </p>
          </div>
        </FadeUp>

        {/* Skills */}
        <FadeUp delay={0.4}>
          <h2 className="mb-8 font-serif text-2xl font-semibold text-stone-800 dark:text-stone-100">
            {t("skills")}
          </h2>
        </FadeUp>
        
        <div className="grid gap-10 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <FadeUp key={group.label} delay={0.5 + (index * 0.1)}>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="cursor-default rounded-full border border-stone-200/60 bg-white/60 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white hover:text-orange-700 hover:shadow-md dark:border-stone-800/80 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:border-orange-500/50 dark:hover:bg-stone-800 dark:hover:text-orange-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}