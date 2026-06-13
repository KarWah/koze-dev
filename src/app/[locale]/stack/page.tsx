import { useTranslations } from "next-intl";
import { Server, Database, Globe, Cloud } from "lucide-react";

export default function StackPage() {
  const t = useTranslations("stack");

  const items = [
    {
      title: t("tech_stack"),
      description: t("tech_stack_desc"),
      icon: Server,
    },
    {
      title: t("deployment"),
      description: t("deployment_desc"),
      icon: Cloud,
    },
    {
      title: t("database"),
      description: t("database_desc"),
      icon: Database,
    },
    {
      title: t("i18n"),
      description: t("i18n_desc"),
      icon: Globe,
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 md:py-32">
      <header className="mb-16 max-w-2xl">
        <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          {t("subtitle")}
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2">
        {items.map((item, index) => (
          <div 
            key={index}
            className="group rounded-3xl border border-stone-200 bg-white p-8 transition-all hover:border-orange-800/50 dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-orange-500/50"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-50 text-stone-400 transition-colors group-hover:bg-orange-50 group-hover:text-orange-800 dark:bg-stone-900 dark:text-stone-500 dark:group-hover:bg-orange-950/30 dark:group-hover:text-orange-500">
              <item.icon size={24} />
            </div>
            <h2 className="mb-3 text-xl font-semibold text-stone-800 dark:text-stone-200">
              {item.title}
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
