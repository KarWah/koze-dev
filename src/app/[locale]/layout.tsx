import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {/* 1. Film Grain Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none bg-noise mix-blend-overlay" />
        
        {/* 2. Ambient Aurora Glows (Moves slightly with CSS if you want, but static blur is great) */}
        <div className="fixed -top-[20%] -left-[10%] z-[-1] h-[50vw] w-[50vw] rounded-full bg-orange-600/10 blur-[120px] dark:bg-orange-900/20" />
        <div className="fixed top-[40%] -right-[10%] z-[-1] h-[40vw] w-[40vw] rounded-full bg-stone-500/10 blur-[120px] dark:bg-stone-700/10" />
  
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    );
}
