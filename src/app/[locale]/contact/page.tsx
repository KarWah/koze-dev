import { useTranslations } from "next-intl";
import { Mail } from "lucide-react"; 
import ContactForm from "@/components/ContactForm"; // Adjust path if needed!

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 md:py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
        
        {/* Left Column: Text & Direct Email */}
        <div>
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mb-10 max-w-md whitespace-pre-line text-lg leading-loose text-stone-600 dark:text-stone-400">
            {t("subtitle")}
          </p>
          
          <div className="rounded-2xl border border-stone-200 bg-white/50 p-6 dark:border-stone-800 dark:bg-stone-900/50">
            <p className="mb-3 text-sm font-medium text-stone-500 dark:text-stone-400">
              {t("or")}
            </p>
            <a 
              href="mailto:karl.wahrenberg@gmail.com" 
              className="group flex items-center gap-3 text-lg font-medium text-stone-800 transition-colors hover:text-orange-800 dark:text-stone-200 dark:hover:text-orange-500"
            >
              <Mail size={20} className="text-stone-400 group-hover:text-orange-800 dark:group-hover:text-orange-500 transition-colors" />
              karl.wahrenberg@gmail.com
            </a>
          </div>
        </div>

        {/* Right Column: The Form Component */}
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-none">
          <ContactForm 
            labels={{
              name: t("name"),
              email: t("email"),
              message: t("message"),
              send: t("send"),
              sending: t("sending"),
              success: t("success"),
              error: t("error"),
            }} 
          />
        </div>

      </div>
    </section>
  );
}