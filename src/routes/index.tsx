import { createFileRoute } from "@tanstack/react-router";
import {
  HomeBeltsSection,
  HomeFoundationSection,
  HomeHeroSection,
  HomePrinciplesSection,
} from "@/components/sections/HomeBasicsSections";
import { HomeClosingSection } from "@/components/sections/HomeClosingSection";
import { HomeCountriesSection } from "@/components/sections/HomeCountriesSection";
import { HomeCultureSection } from "@/components/sections/HomeCultureSection";
import { HomeDojoArcade } from "@/components/sections/HomeDojoArcade";
import { HomeHistorySection } from "@/components/sections/HomeHistorySection";
import { KicksSection } from "@/components/sections/KicksSection";
import { MusashiSection } from "@/components/sections/MusashiSection";
import { createPageTitle } from "@/utils/pageTitle";
import "@/styles/global/home-experience.css";
import { HomeAtmosphere } from "@/components/taekwondo/HomeAtmosphere";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: createPageTitle("Inicio") },
      {
        name: "description",
        content:
          "Historia, filosofía, técnica y cultura del Taekwondo por la Fundación Deportiva Equilibrio de Colombia. Dokkōdō, galería y recorrido por país.",
      },
      {
        property: "og:title",
        content: "Taekwondo | Fundación Deportiva Equilibrio",
      },
      {
        property: "og:description",
        content:
          "Todo sobre el Taekwondo: origen, principios, grados, Dokkōdō, galería y su llegada a cada país.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="home-experience">
      <HomeAtmosphere />
      <HomeHeroSection />
      <HomeDojoArcade />
      <HomeHistorySection />
      <HomeFoundationSection />
      <HomePrinciplesSection />
      <HomeBeltsSection />
      <KicksSection />
      <HomeCultureSection />
      <MusashiSection />
      <HomeCountriesSection />
      <HomeClosingSection />
    </div>
  );
}
