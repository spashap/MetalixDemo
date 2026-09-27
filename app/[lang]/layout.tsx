import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { JetBrains_Mono, Noto_Sans_SC, Source_Sans_3 } from "next/font/google";
import { hasLocale, localeInfo, locales, loaders } from "@/content";
import "../globals.css";

const sans = Source_Sans_3({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
// Chinese glyphs are served as unicode-range slices, so non-Chinese pages download none of them.
const sc = Noto_Sans_SC({ weight: ["400", "500", "700", "900"], variable: "--font-sc", display: "swap", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await loaders[lang]();
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return {
    metadataBase: new URL(host ? `https://${host}` : "http://localhost:3000"),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [localeInfo[l].hreflang, `/${l}`])),
    },
    openGraph: { title: dict.meta.title, description: dict.meta.description, images: ["/img/cover.webp"] },
    icons: { icon: "/img/logo.png" },
  };
}

export const viewport: Viewport = { themeColor: "#08080a", colorScheme: "dark" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={localeInfo[lang].hreflang} className={`${sans.variable} ${sc.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
