import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  // We pull these directly from your CV!
  const skills = [
    "Next.js & React", "TypeScript", "Python", "PostgreSQL",
    "Redis", "C++ & C#", "Godot 4", "AI & Computer Vision"
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 md:py-32">
      <div className="grid gap-16 md:grid-cols-2">
        
        {/* Left Column: Text */}
        <div>
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="max-w-prose text-lg leading-loose text-stone-600 dark:text-stone-400">
            {t("bio")}
          </p>
        </div>

        {/* Right Column: Skills Grid */}
        <div>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-stone-800 dark:text-stone-100">
            {t("skills")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-transform hover:-translate-y-0.5 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}