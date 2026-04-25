import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messageLoaders = {
  en: () => import("../messages/en.json"),
  sv: () => import("../messages/sv.json"),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const loader = messageLoaders[locale as keyof typeof messageLoaders];
  const messages = (await loader()).default;

  return { locale, messages };
});
