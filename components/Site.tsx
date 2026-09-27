"use client";

import type { Dict, Locale } from "@/content";
import { I18nProvider } from "./i18n";
import { Chrome, Footer } from "./chrome";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Factory from "./sections/Factory";
import CncKad from "./sections/CncKad";
import MBend from "./sections/MBend";
import MRobot from "./sections/MRobot";
import MTube from "./sections/MTube";
import Nesting from "./sections/Nesting";
import Estimation from "./sections/Estimation";
import Mes from "./sections/Mes";
import Erp from "./sections/Erp";
import Service from "./sections/Service";

export default function Site({ lang, dict }: { lang: Locale; dict: Dict }) {
  return (
    <I18nProvider lang={lang} dict={dict}>
      <Chrome>
        <main>
          <Hero />
          <About />
          <Factory />
          <CncKad />
          <MBend />
          <MRobot />
          <MTube />
          <Nesting />
          <Estimation />
          <Mes />
          <Erp />
          <Service />
        </main>
        <Footer />
      </Chrome>
    </I18nProvider>
  );
}
