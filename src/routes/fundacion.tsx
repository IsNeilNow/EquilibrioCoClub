import { createFileRoute } from "@tanstack/react-router";
import dojang from "@/assets/dojang.jpg";
import tatianaPhoto from "@/assets/maestros/TatianaMaestra.jpeg";
import paolaPhoto from "@/assets/maestros/PaolaMaestra.jpeg";
import { ClubProgram } from "@/components/sections/HomeClubProgram";
import { HomeIdentityLab } from "@/components/sections/HomeIdentityLab";
import { HomeAcademyOverview } from "@/components/sections/HomeAcademyOverview";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/fundacion")({
  head: () => ({
    meta: [
      { title: createPageTitle("Fundación") },
      {
        name: "description",
        content:
          "Conoce la Fundación Deportiva Equilibrio de Colombia: su misión, su historia y el cuerpo de maestros con rangos, estudios y contacto.",
      },
      {
        property: "og:title",
        content: "La Fundación y sus Maestros | Equilibrio",
      },
      {
        property: "og:description",
        content:
          "Misión, valores y cuerpo técnico de la Fundación Deportiva Equilibrio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fundacion,
});

const maestros = [
  {
    nombre: "Nelson Andrés Pérez Zuluaga",
    foto: undefined,
    rango: "Maestro fundador",
    rol: "Fundador y creador de VAIPER",
    descripcion:
      "Fundador del Club Equilibrio el 12 de junio de 2009 y creador del Sistema de Combate VAIPER.",
    estudios: [
      "Maestro fundador del Club Equilibrio",
      "Creador del Sistema de Combate VAIPER",
    ],
  },
  {
    nombre: "Tatiana Montoya Ortiz",
    foto: tatianaPhoto,
    rango: "Cinturón Negro 1.er Dan",
    rol: "Segunda maestra",
    descripcion:
      "Psicóloga y competidora en diferentes modalidades dentro de la Liga de Taekwondo de Antioquia.",
    estudios: [
      "Psicología",
      "Taekwondo, Judo, Muay Thai y Karate",
    ],
  },
  {
    nombre: "Paola Andrea Apaza Álvaro",
    foto: paolaPhoto,
    rango: "Cinturón Negro 1.er Dan",
    rol: "Tercera maestra",
    descripcion:
      "Ingeniera en Sistemas y competidora en Open Internacional y competencias interclubes de artes marciales.",
    estudios: [
      "Ingeniería en Sistemas",
      "Taekwondo, Hapkido, Kumdo y Lucha",
    ],
  },
  {
    nombre: "Manuela Serna Velásquez",
    foto: undefined,
    rango: "Cinturón Negro 1.er Dan",
    rol: "Profesora",
    descripcion:
      "Ingeniera en Sistemas y competidora en Open Internacional e Intercolegiados.",
    estudios: [
      "Ingeniería en Sistemas",
      "Taekwondo, Defensa Personal Militar, Defensa Personal Femenina y VAIPER",
    ],
  },
];

function Fundacion() {
  return (
    <div>
      <section className="relative border-b border-border">
        <img
          src={dojang}
          alt="Estudiantes de la fundación saludando en el dojang"
          width={1200}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
        <div className="relative mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
          <p className="eyebrow reveal">Colombia · Desde 2009</p>
          <h1 className="reveal mt-5 max-w-4xl text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            Fundación Deportiva <span className="text-primary">Equilibrio</span>
          </h1>
          <p className="reveal mt-6 max-w-2xl text-muted-foreground">
            Formamos personas antes que atletas. Usamos el Taekwondo como
            herramienta social, educativa y competitiva para niños, jóvenes y
            adultos de nuestras comunidades.
          </p>
          <p className="reveal mt-8 max-w-2xl font-display text-xl uppercase tracking-[0.12em] text-primary sm:text-2xl">
            Del débil, fuerte. Del fuerte, noble.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-12 grid gap-6 border-y border-border py-8 md:grid-cols-[auto_1fr_1fr] md:items-center">
          <p className="font-display text-6xl text-primary">2009</p>
          <div>
            <p className="eyebrow">12 de junio · Punto de partida</p>
            <h2 className="mt-2 text-2xl uppercase">Los orígenes de Equilibrio</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nelson Andrés Pérez Zuluaga fundó el club para generar entornos
            saludables, fomentar el Taekwondo, promover la recreación y
            convertir las artes marciales en una herramienta de transformación
            social.
          </p>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {[
            ["Misión", "Potencializar las capacidades psicosociales y emocionales de cada integrante, promoviendo el uso adecuado del tiempo libre y la formación en valores, disciplina y respeto."],
            ["Visión", "Generar interacción y formación de líderes, fomentar la inversión del tiempo libre y brindar un entorno sano y libre de costos para toda la población."],
            ["Fundación", "Asociación deportiva de derecho privado, sin ánimo de lucro, fundada el 12 de junio de 2009 por Nelson Andrés Pérez Zuluaga."],
          ].map(([t, d]) => (
            <div key={t} className="bg-background p-8">
              <h2 className="text-2xl uppercase text-primary">{t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
          <p className="eyebrow">Cuerpo técnico</p>
          <h2 className="mt-3 text-4xl uppercase">Nuestros maestros</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Formación, experiencia y disciplinas declaradas por el Club
            Equilibrio.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {maestros.map((m) => (
              <article
                key={m.nombre}
                className="group border border-border bg-background p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    {m.foto ? (
                      <img
                        src={m.foto}
                        alt={`Retrato de ${m.nombre}`}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
                      />
                    ) : (
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-primary/60 font-display text-xs text-primary">
                        EQ
                      </span>
                    )}
                    <div>
                      <h3 className="text-2xl uppercase">{m.nombre}</h3>
                      <p className="mt-1 font-display text-sm uppercase tracking-[0.2em] text-primary">
                        {m.rango}
                      </p>
                    </div>
                  </div>
                  <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {m.rol}
                  </span>
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  {m.descripcion}
                </p>

                <p className="eyebrow mt-6">Estudios</p>
                <ul className="mt-3 space-y-2">
                  {m.estudios.map((e) => (
                    <li
                      key={e}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 block h-px w-5 shrink-0 bg-primary" />
                      {e}
                    </li>
                  ))}
                </ul>

              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[90rem] px-6 pt-16 sm:px-8 sm:pt-24 lg:px-10">
        <p className="eyebrow">Nuestro club</p>
        <h2 className="mt-3 text-4xl uppercase sm:text-6xl">
          Identidad, formación y <span className="text-primary">camino.</span>
        </h2>
      </section>
      <HomeIdentityLab />
      <HomeAcademyOverview />
      <ClubProgram />
    </div>
  );
}
