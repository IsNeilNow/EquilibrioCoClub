import { createFileRoute } from "@tanstack/react-router";
import andres from "@/assets/maestros/AndresMaestro.jpeg";
import tatiana from "@/assets/maestros/TatianaMaestra.jpeg";
import paola from "@/assets/maestros/PaolaMaestra.jpeg";
import manuela from "@/assets/maestros/ManuelaMaestra.jpeg";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/logros")({
  head: () => ({
    meta: [
      { title: createPageTitle("Logros") },
      {
        name: "description",
        content:
          "Maestros, logros y experiencia competitiva de la Fundación Deportiva Equilibrio.",
      },
      {
        property: "og:title",
        content: "Maestros y experiencia | Equilibrio",
      },
      {
        property: "og:description",
        content: "Perfil formativo y experiencia competitiva del equipo Equilibrio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Logros,
});

type Maestro = {
  nombre: string;
  rol: string;
  foto: string;
  perfil: string;
  datos: readonly string[];
  experiencia?: string;
};

const maestros: readonly Maestro[] = [
  {
    nombre: "Andrés Pérez Zuluaga",
    rol: "Fundador del Club Equilibrio",
    foto: andres,
    perfil: "Creador del Sistema de Combate VAIPER, sistema de combate propio del club.",
    datos: [
      "Cinturón Negro 4.º Dan en Taekwondo",
      "Formación profesional: Psicología",
      "Entrena Taekwondo, Lucha, Muay Thai, Judo y Karate",
    ],
    experiencia: "Participante en diferentes Open Internacionales.",
  },
  {
    nombre: "Tatiana Montoya Ortiz",
    rol: "Segunda maestra del Club Equilibrio",
    foto: tatiana,
    perfil: "Acompaña el desarrollo técnico y formativo de los practicantes.",
    datos: [
      "Cinturón Negro 1.er Dan en Taekwondo",
      "Formación profesional: Psicología",
      "Entrena Taekwondo, Judo, Muay Thai y Karate",
    ],
    experiencia:
      "Competidora en diferentes modalidades dentro de la Liga de Taekwondo de Antioquia.",
  },
  {
    nombre: "Paola Andrea Apaza Álvaro",
    rol: "Tercera maestra de Equilibrio",
    foto: paola,
    perfil: "Integra precisión técnica y análisis desde una formación multidisciplinaria.",
    datos: [
      "Cinturón Negro 1.er Dan en Taekwondo",
      "Formación profesional: Ingeniería de Sistemas",
      "Entrena Taekwondo, Hapkido, Kumdo y Lucha",
    ],
    experiencia:
      "Competidora en Open Internacionales y competencias interclubes de artes marciales.",
  },
  {
    nombre: "Manuela Serna Velásquez",
    rol: "Profesora",
    foto: manuela,
    perfil: "Apoya la enseñanza técnica y los procesos de defensa personal del club.",
    datos: [
      "Cinturón Negro 1.er Dan en Taekwondo",
      "Formación profesional: Ingeniería de Sistemas",
      "Entrena Taekwondo, defensa personal militar, defensa personal femenina y VAIPER",
    ],
  },
];

const logrosInstitucionales = [
  {
    numero: "01",
    titulo: "Clubes deportivos del INDER",
    detalle: "Logro ser parte de clubes deportivos por parte del INDER en el año 2024.",
  },
  {
    numero: "02",
    titulo: "17 años al servicio de la comunidad",
    detalle:
      "Cumplí 17 años apoyando a las personas a través de las artes marciales.",
  },
] as const;

function Logros() {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
      <p className="eyebrow reveal">Equipo · Experiencia · Logros</p>
      <h1 className="reveal mt-4 text-5xl uppercase leading-[0.95]">
        Maestros que <span className="text-primary">forman el camino</span>
      </h1>
      <p className="reveal mt-5 max-w-2xl text-muted-foreground">
        Conoce al equipo que sostiene la enseñanza de Equilibrio: su formación,
        sus modalidades de entrenamiento y la experiencia competitiva que
        acompaña cada proceso de aprendizaje.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {maestros.map((maestro, index) => (
          <article
            key={maestro.nombre}
            className="group overflow-hidden border border-border bg-background transition-colors duration-300 hover:bg-card"
          >
            <div className="grid sm:grid-cols-[10rem_1fr]">
              <img
                src={maestro.foto}
                alt={`Fotografía de ${maestro.nombre}`}
                className="h-56 w-full object-cover object-top grayscale transition duration-500 group-hover:grayscale-0 sm:h-full"
              />
              <div className="p-6">
                <p className="font-display text-sm text-primary">
                  {String(index + 1).padStart(2, "0")} · {maestro.rol}
                </p>
                <h2 className="mt-2 text-2xl uppercase">{maestro.nombre}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {maestro.perfil}
                </p>
                <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                  {maestro.datos.map((dato) => (
                    <li key={dato}>{dato}</li>
                  ))}
                </ul>
                {maestro.experiencia && (
                  <div className="mt-5 border-l-2 border-primary pl-4">
                    <p className="font-display text-xs uppercase tracking-[0.15em] text-primary">
                      Experiencia competitiva
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {maestro.experiencia}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16 border-t border-border pt-10">
        <p className="eyebrow">Trayectoria institucional</p>
        <h2 className="mt-3 text-3xl uppercase">
          Logros que <span className="text-primary">sostienen el propósito</span>
        </h2>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
          {logrosInstitucionales.map((logro) => (
            <article
              key={logro.numero}
              className="bg-background p-6 transition-colors duration-300 hover:bg-card sm:p-8"
            >
              <p className="font-display text-4xl text-primary">{logro.numero}</p>
              <h3 className="mt-5 text-xl uppercase">{logro.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {logro.detalle}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
