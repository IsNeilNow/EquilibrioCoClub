import arm1 from "@/assets/brazo/Básico 1.mp4";
import arm2 from "@/assets/brazo/Básico 2 (1).mp4";
import arm3 from "@/assets/brazo/Básico 3.mp4";
import arm4 from "@/assets/brazo/Básico 4.mp4";
import arm5 from "@/assets/brazo/Básico 5 (1).mp4";
import foot1 from "@/assets/pie/Básico 1 (1).mp4";
import foot2 from "@/assets/pie/Básico 2 (3).mp4";
import foot3 from "@/assets/pie/Básico 3 (1).mp4";
import foot4 from "@/assets/pie/Básico 4 (2).mp4";
import foot5 from "@/assets/pie/Básico 5 (2).mp4";
import floor1 from "@/assets/piso/Basicos piso (1).mp4";
import { useState } from "react";

type TechniqueCategory = "brazo" | "pie" | "piso";

const techniques: Record<TechniqueCategory, readonly [string, string][]> = {
  brazo: [
    ["Básico 1", arm1], ["Básico 2", arm2], ["Básico 3", arm3],
    ["Básico 4", arm4], ["Básico 5", arm5],
  ],
  pie: [
    ["Básico 1", foot1], ["Básico 2", foot2], ["Básico 3", foot3],
    ["Básico 4", foot4], ["Básico 5", foot5],
  ],
  piso: [["Básicos de piso", floor1]],
};

const categoryDetails: Record<TechniqueCategory, { title: string; description: string }> = {
  brazo: {
    title: "Técnicas de brazo",
    description: "Bloqueos, golpes y defensas básicas. Estudia la trayectoria con supervisión del profesor.",
  },
  pie: {
    title: "Técnicas de pie",
    description: "Trabajo progresivo de pierna y patadas. Practica equilibrio, distancia y control.",
  },
  piso: {
    title: "Técnicas de piso",
    description: "Movilidad y coordinación en el suelo. Ejecuta las transiciones con seguridad y acompañamiento.",
  },
};

export function TechniqueAcademySection() {
  const [category, setCategory] = useState<TechniqueCategory>("brazo");
  const detail = categoryDetails[category];

  return (
    <section id="tecnicas-academia" className="technique-academy border-t border-border bg-card/30">
      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-24 lg:px-10">
        <p className="eyebrow">Academia · Estudio técnico</p>
        <h2 className="mt-3 text-4xl uppercase sm:text-6xl">Brazo, pie y piso.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tres apartados independientes con el material audiovisual local del
          club. Los videos se cargan bajo demanda para mantener el sitio fluido.
        </p>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Categorías de técnicas">
          {(Object.keys(categoryDetails) as TechniqueCategory[]).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={value === category}
              onClick={() => setCategory(value)}
              className="border border-border px-4 py-3 font-display text-xs uppercase tracking-[0.15em] transition-colors hover:border-primary aria-selected:border-primary aria-selected:bg-primary/10"
            >
              {categoryDetails[value].title}
            </button>
          ))}
        </div>
        <div className="mt-10 flex items-end justify-between gap-5">
          <div>
            <h3 className="text-2xl uppercase text-primary">{detail.title}</h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{detail.description}</p>
          </div>
          <span className="hidden font-display text-5xl text-primary/20 sm:block">3D</span>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techniques[category].map(([title, source], index) => (
            <article key={title} className="technique-academy__card overflow-hidden border border-border bg-background">
              <div className="relative aspect-video bg-black">
                <video
                  className="h-full w-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  src={source}
                />
                <span className="absolute left-3 top-3 border border-primary/60 bg-background/80 px-2 py-1 font-display text-[0.65rem] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-4">
                <h4 className="uppercase">{title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Observa la posición y la trayectoria; repite solo con orientación técnica.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
