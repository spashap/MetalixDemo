import { notFound } from "next/navigation";
import { hasLocale, loaders } from "@/content";
import Site from "@/components/Site";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await loaders[lang]();
  return <Site lang={lang} dict={dict} />;
}
