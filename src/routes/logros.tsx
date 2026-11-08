import { createFileRoute } from "@tanstack/react-router";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/logros")({
  head: () => ({
    meta: [
      { title: createPageTitle("Logros") },
      {
        name: "description",
        content:
          "Logros y experiencia competitiva de la Fundación Deportiva Equilibrio.",
      },
      {
        property: "og:title",
        content: "Logros | Equilibrio",
      },
      {
        property: "og:description",
        content: "Experiencia competitiva y trayectoria del Club Equilibrio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Logros,
});

type Logro = {
  numero: string;
  quien: string;
  titulo: string;
  detalle: string;
};

const logros: readonly Logro[] = [
  {
    numero: "01",
    quien: "Andrés Pérez Zuluaga",
    titulo: "Participación en Open Internacionales",
    detalle: "Participante en diferentes Open Internacionales.",
  },
  {
    numero: "02",
    quien: "Tatiana Montoya Ortiz",
    titulo: "Competencia en la Liga de Taekwondo de Antioquia",
    detalle:
      "Competidora en diferentes modalidades dentro de la Liga de Taekwondo de Antioquia.",
  },
  {
    numero: "03",
    quien: "Paola Andrea Apaza Álvaro",
    titulo: "Open Internacionales y competencias interclubes",
    detalle:
      "Competidora en Open Internacionales y competencias interclubes de artes marciales.",
  },
  {
    numero: "04",
    quien: "Club Equilibrio",
    titulo: "Participación en clubes deportivos del INDER",
    detalle: "Logro ser parte de clubes deportivos por parte del INDER en el año 2024.",
  },
  {
    numero: "05",
    quien: "Club Equilibrio",
    titulo: "17 años al servicio de la comunidad",
    detalle:
      "Cumplí 17 años apoyando a las personas a través de las artes marciales.",
  },
] as const;

function Logros() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
      <p className="eyebrow reveal">Experiencia · Trayectoria · Logros</p>
      <h1 className="reveal mt-4 text-5xl uppercase leading-[0.95]">
        La experiencia que <span className="text-primary">nos respalda</span>
      </h1>
      <p className="reveal mt-5 max-w-2xl text-muted-foreground">
        Logros y experiencias que forman parte de la trayectoria del Club
        Equilibrio y de las personas que han construido su camino marcial.
      </p>

      <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
        {logros.map((logro) => (
          <article
            key={logro.numero}
            className="group bg-background p-6 transition-colors duration-300 hover:bg-card sm:p-8"
          >
            <p className="font-display text-4xl text-primary">{logro.numero}</p>
            <p className="mt-5 font-display text-xs uppercase tracking-[0.15em] text-primary">
              {logro.quien}
            </p>
            <h2 className="mt-2 text-xl uppercase">{logro.titulo}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {logro.detalle}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
